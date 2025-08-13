"use client";
/**
 * This config is used to set up Sanity Studio that's mounted on the `app/(sanity)/studio/[[...tool]]/page.tsx` route
 */
import { visionTool } from "@sanity/vision";
import { SchemaTypeDefinition, defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { dashboardTool, projectInfoWidget, projectUsersWidget } from "@sanity/dashboard";
import { documentListWidget } from 'sanity-plugin-dashboard-widget-document-list'
import { imageHotspotArrayPlugin } from "sanity-plugin-hotspot-array";

import { apiVersion, dataset, projectId, studioUrl } from "@/sanity/lib/api";
import { defaultDocumentNode, structure } from '@/sanity/structure';
import { hierarchicalDocumentList, hierarchyTree } from '@sanity/hierarchical-document-list'
import { documentInternationalization } from '@sanity/document-internationalization'
import { languageFilter } from '@sanity/language-filter';
import { schemaTypes } from '@/sanity/munaPlugin/src';
import { table } from '@sanity/table';
import { codeInput } from '@sanity/code-input';
import { colorInput } from '@sanity/color-input';
import { media } from 'sanity-plugin-media';
import { timespanInput } from '@seidhr/sanity-plugin-timespan-input';

// import { pageStructure, singletonPlugin } from "@/sanity/plugins/settings";
/* import {
  presentationTool,
  defineDocuments,
  defineLocations,
  type DocumentLocation,
} from "sanity/presentation"; */

/* const homeLocation = {
  title: "Home",
  href: "/",
} satisfies DocumentLocation; */

export default defineConfig({
  name: 'decrimhist',
  basePath: studioUrl,
  projectId,
  dataset,
  schema: {
    types: [
      ...schemaTypes as SchemaTypeDefinition[],
      hierarchyTree
    ],
  },
  scheduledPublishing: {
    enabled: false,
  },
  plugins: [
    /* presentationTool({
      resolve: {
        mainDocuments: defineDocuments([
          {
            route: "/posts/:slug",
            filter: `_type == "post" && slug.current == $slug`,
          },
        ]),
        locations: {
          settings: defineLocations({
            locations: [homeLocation],
            message: "This document is used on all pages",
            tone: "caution",
          }),
          post: defineLocations({
            select: {
              title: "title",
              slug: "slug.current",
            },
            resolve: (doc) => ({
              locations: [
                {
                  title: doc?.title || "Untitled",
                  href: resolveHref("post", doc?.slug)!,
                },
                homeLocation,
              ],
            }),
          }),
        },
      },
      previewUrl: { previewMode: { enable: "/api/draft-mode/enable" } },
    }), */
    dashboardTool({
      widgets: [
        documentListWidget({
          title: 'Last edited',
          order: '_updatedAt desc',
        }),
        projectInfoWidget(),
        projectUsersWidget(),
      ]
    }),
    timespanInput(),
    hierarchicalDocumentList(),
    imageHotspotArrayPlugin(),
    documentInternationalization({
      // Required:
      supportedLanguages: [
        { id: 'en', title: 'English' },
        { id: 'no', title: 'Norwegian' },
        { id: 'es', title: 'Spanish' },
      ],
      schemaTypes: ['Page', 'LinguisticDocument'],
      // Optional:
      weakReferences: false, // default false
      languageField: '_language', // default "language"
    }),
    languageFilter({
      supportedLanguages: [
        { id: 'en', title: 'English' },
        { id: 'no', title: 'Norwegian' },
        { id: 'es', title: 'Spanish' },
      ],
      // Select Norwegian (Bokmål) by default
      defaultLanguages: ['en'],
      // Only show language filter for document type `page` (schemaType.name)
      //documentTypes: undefined, // This breaks documentInternationalization, so we 
      filterField: (enclosingType, field, selectedLanguageIds) =>
        !enclosingType.name.startsWith('Localized') || selectedLanguageIds.includes(field.name),
    }),
    structureTool({
      structure,
      defaultDocumentNode,
    }),
    // Configures the global "new document" button, and document actions, to suit the Settings document singleton
    // singletonPlugin([settings.name]),
    // Vision lets you query your content with GROQ in the studio
    // https://www.sanity.io/docs/the-vision-plugin
    visionTool({ defaultApiVersion: apiVersion }),
    codeInput(),
    colorInput(),
    table(),
    media(),
  ].filter(Boolean),
});
