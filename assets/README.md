# Assets Directory

This directory contains the app's assets including icons, splash screens, and other images.

## Required Assets

For a complete Expo app, you'll need to add the following files:

- `icon.png` - App icon (1024x1024px)
- `splash.png` - Splash screen image
- `adaptive-icon.png` - Android adaptive icon (1024x1024px)
- `favicon.png` - Web favicon (48x48px)

## Generating Assets

You can generate these assets using:

1. **Expo CLI**: Run `npx expo install expo-splash-screen` and use the splash screen generator
2. **Online tools**: Use services like [App Icon Generator](https://appicon.co/) or [Expo Icon Generator](https://expo.dev/tools/icon)
3. **Design tools**: Create assets in Figma, Sketch, or Adobe XD

## Placeholder Assets

For development purposes, you can use simple colored squares or the Expo default assets until you create your final designs.

## Asset Guidelines

- **App Icon**: Should be 1024x1024px, PNG format, no transparency
- **Splash Screen**: Should match your app's design, typically 1242x2436px for iPhone
- **Adaptive Icon**: 1024x1024px with safe area considerations for Android
- **Favicon**: 48x48px for web version