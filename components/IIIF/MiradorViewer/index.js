import React, { useEffect } from 'react'
import mirador from 'mirador'
import { Box, useColorModeValue } from '@chakra-ui/react'
import { nanoid } from 'nanoid'
import NavgationButtonsPlugin from './plugins/NavgationButtonsPlugin'
import RemoveNavPlugin from './plugins/RemoveNavPlugin'
import ThumbnailCustomizationPlugin from './plugins/ThumbnailCustomizationPlugin'
import ZoomButtonsPlugin from './plugins/ZoomButtonsPlugin'
import RemoveWindowTopBarPlugin from './plugins/RemoveWindowTopBarPlugin'

const getVariant = (variant) => {
  switch (variant) {
    case 'basic':
      return {
        variantSettings: {
          maximized: true,
          allowMaximize: false,
          allowClose: false,
          allowTopMenuButton: false,
          allowFullscreen: true,
          view: 'single',
        },
        plugins: [
          RemoveWindowTopBarPlugin,
          RemoveNavPlugin,
          ThumbnailCustomizationPlugin,
          NavgationButtonsPlugin,
          ZoomButtonsPlugin,
        ],
      }
    case 'standard':
      return {
        variantSettings: {
          maximized: true,
          allowClose: false,
          allowTopMenuButton: false,
          allowFullscreen: true,
        },
        plugins: [
          RemoveNavPlugin,
          ThumbnailCustomizationPlugin,
          NavgationButtonsPlugin,
          ZoomButtonsPlugin,
        ],
      }
    case 'catalog':
      return {
        variantSettings: {
          maximized: false,
          allowClose: true,
          allowTopMenuButton: true,
          allowFullscreen: true,
        },
        plugins: [],
      }
    default:
      return {
        variantSettings: {
          maximized: true,
          allowMaximize: false,
          allowClose: false,
          allowTopMenuButton: false,
          allowFullscreen: true,
          hideWindowTitle: true,
        },
        plugins: [
          RemoveNavPlugin,
          ThumbnailCustomizationPlugin,
          NavgationButtonsPlugin,
          ZoomButtonsPlugin,
        ],
      }
  }
}

const mergeManifestAndVariant = (arr, settings) => {
  let windows = []
  if (arr.length === 1) {
    windows = [
      {
        manifestId: arr[0].manifest,
        ...(arr[0].canvasUrl && { canvasId: arr[0].canvasUrl }),
        ...settings,
        view: arr[0].view,
        allowMaximize: false,
      },
    ]
  }
  if (arr.length > 1) {
    windows = arr.map((arr) => ({
      manifestId: arr.manifest,
      ...(arr.canvasUrl && { canvasId: arr.canvasUrl }),
      ...settings,
      view: arr.view,
      maximized: false,
    }))
  }
  return windows
}

export default function MiradorViewer(props) {
  const mode = useColorModeValue('light', 'dark')
  const ID = `mirador-${nanoid()}`

  const {
    variant,
    manifests,
    workspaceControlPanel = false,
    gridArea,
    catalog,
    height = '60vh',
  } = props

  const { variantSettings, plugins } = getVariant(variant)
  const windows = manifests ? mergeManifestAndVariant(manifests, variantSettings) : null

  useEffect(() => {
    let config = {
      id: ID,
      windows: windows ?? null,
      catalog: catalog ? [{ manifestId: catalog }] : null,
      createGenerateClassNameOptions: {
        productionPrefix: ID,
      },
      workspaceControlPanel: {
        enabled: workspaceControlPanel,
      },
      window: {
        defaultView: 'book',
      },
      workspace: {
        showZoomControls: false, // Remove default zoom and add plugin
      },
      selectedTheme: mode,
      themes: {
        dark: {
          palette: {
            type: 'dark',
            primary: {
              main: '#789a5b',
            },
            secondary: {
              main: '#789a5b',
            },
            shades: {
              dark: '#000000',
              main: '#424242',
              light: '#616161',
            },
          },
        },
        light: {
          palette: {
            type: 'light',
            primary: {
              main: '#789a5b',
            },
            secondary: {
              main: '#789a5b',
            },
          },
        },
      },
      galleryView: {
        height: 220,
      },
      thumbnailNavigation: {
        defaultPosition: 'off',
      },
      osdConfig: {
        // Config used for OpenSeadragon
        gestureSettingsMouse: {
          scrollToZoom: false,
        },
      },
    }
    let miradorInstance = mirador.viewer(config, plugins) // eslint-disable-line
    return () => {
      // console.log(`unmounting... ${ID}`)
      miradorInstance = null
    }
  }, [ID, catalog, mode, plugins, windows, workspaceControlPanel])

  return (
    <Box h={height} position="relative" gridArea={gridArea} bgColor="#eeeeee">
      <Box h="100%" id={ID} />
    </Box>
  )
}
