import { DOCUMENT } from '@angular/common';
import { Injectable, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';

interface RouteSeoData {
  title?: string;
  description?: string;
  canonicalPath?: string;
  robots?: string;
  ogType?: string;
  schemaType?: 'LocalBusiness' | 'WebPage';
}

@Injectable({ providedIn: 'root' })
export class SeoService {
  private readonly title = inject(Title);
  private readonly meta = inject(Meta);
  private readonly router = inject(Router);
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly document = inject(DOCUMENT);

  private readonly siteName = 'D Lima Estruturas Metálicas';
  private readonly fallbackDescription = 'Serralheria em São Paulo com estruturas metálicas, mezaninos, escadas, portões automáticos, grades e corrimãos sob medida.';
  private readonly fallbackOgImage = '/assets/img/serralheria.webp';

  init(): void {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        this.applyRouteSeo();
      });

    this.applyRouteSeo();
  }

  private applyRouteSeo(): void {
    const route = this.getCurrentRoute();
    const data = (route.snapshot.data ?? {}) as RouteSeoData;

    const title = data.title ?? this.siteName;
    const description = data.description ?? this.fallbackDescription;
    const ogType = data.ogType ?? 'website';
    const canonicalPath = data.canonicalPath ?? this.router.url.split('?')[0] ?? '/';
    const robots = data.robots ?? 'index, follow';
    const canonicalUrl = this.toCanonicalUrl(canonicalPath);

    this.title.setTitle(title);
    this.meta.updateTag({ name: 'description', content: description });
    this.meta.updateTag({ name: 'robots', content: robots });

    this.meta.updateTag({ property: 'og:site_name', content: this.siteName });
    this.meta.updateTag({ property: 'og:title', content: title });
    this.meta.updateTag({ property: 'og:description', content: description });
    this.meta.updateTag({ property: 'og:url', content: canonicalUrl });
    this.meta.updateTag({ property: 'og:type', content: ogType });
    this.meta.updateTag({ property: 'og:image', content: this.toCanonicalUrl(this.fallbackOgImage) });

    this.meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
    this.meta.updateTag({ name: 'twitter:title', content: title });
    this.meta.updateTag({ name: 'twitter:description', content: description });
    this.meta.updateTag({ name: 'twitter:image', content: this.toCanonicalUrl(this.fallbackOgImage) });

    this.updateCanonical(canonicalUrl);
    this.updateJsonLd(data.schemaType ?? 'WebPage', canonicalUrl, title, description);
    this.updateBreadcrumbJsonLd(canonicalUrl, canonicalPath, title);
  }

  private getCurrentRoute(): ActivatedRoute {
    let route = this.activatedRoute;
    while (route.firstChild) {
      route = route.firstChild;
    }
    return route;
  }

  private toCanonicalUrl(path: string): string {
    const sanitizedPath = path.startsWith('/') ? path : `/${path}`;
    return new URL(sanitizedPath, this.document.location?.origin ?? 'http://localhost:4200').toString();
  }

  private updateCanonical(url: string): void {
    let canonical = this.document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;

    if (!canonical) {
      canonical = this.document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      this.document.head.appendChild(canonical);
    }

    canonical.setAttribute('href', url);
  }

  private updateJsonLd(schemaType: RouteSeoData['schemaType'], canonicalUrl: string, pageTitle: string, pageDescription: string): void {
    const organizationSchema = {
      '@context': 'https://schema.org',
      '@type': 'LocalBusiness',
      name: this.siteName,
      image: this.toCanonicalUrl(this.fallbackOgImage),
      url: this.toCanonicalUrl('/'),
      telephone: '+55-11-98410-9502',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Rua Antônio de França e Silva, 62',
        addressLocality: 'São Paulo',
        addressRegion: 'SP',
        postalCode: '03978-540',
        addressCountry: 'BR'
      },
      sameAs: ['https://www.instagram.com/dlima_estruturasmetalicas/']
    };

    let schema: unknown;
    switch (schemaType) {
      case 'LocalBusiness':
        schema = organizationSchema;
        break;
      default:
        schema = {
          '@context': 'https://schema.org',
          '@type': 'WebPage',
          name: pageTitle,
          description: pageDescription,
          url: canonicalUrl,
          isPartOf: this.toCanonicalUrl('/')
        };
        break;
    }

    this.writeJsonLdScript('jsonld-main', schema);
  }

  private updateBreadcrumbJsonLd(canonicalUrl: string, canonicalPath: string, pageTitle: string): void {
    const items = [{
      '@type': 'ListItem',
      position: 1,
      name: 'Home',
      item: this.toCanonicalUrl('/')
    }];

    if (canonicalPath !== '/' && canonicalPath !== '') {
      items.push({
        '@type': 'ListItem',
        position: 2,
        name: pageTitle,
        item: canonicalUrl
      });
    }

    const breadcrumbSchema = {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: items
    };

    this.writeJsonLdScript('jsonld-breadcrumb', breadcrumbSchema);
  }

  private writeJsonLdScript(id: string, schema: unknown): void {
    let script = this.document.getElementById(id) as HTMLScriptElement | null;

    if (!script) {
      script = this.document.createElement('script');
      script.id = id;
      script.type = 'application/ld+json';
      this.document.head.appendChild(script);
    }

    script.textContent = JSON.stringify(schema);
  }
}
