---
title: "Ender 3 S1 3D Printer Profiles"
slug: "profiles"
date: "2024-09-25"
lastmod: "2024-09-25"
tags: []
description: "nan"
---

The following are my 2 most common and used profiles for anyone running a Ender 3 S1 or S1 Pro. They should work for anyone running a direct drive extruder. They were designed for PLA but may work with other profiles (with temp/fan/retraction adjustments). These for the most part are set and forget profiles and work if you have a leveled bed.

Full details for each of these profiles are linked below.

### 120 mm/s Good Quality Profile @ .2 mm layer height

This profile gives nearly double the "stock" profile speed and still produces strong prints through use of the "cubic" infill.

This profile has been tested at scale amongst the Reddit community and is a good starting profile if you are new to 3d Printing or just want to start with something battle tested.

[DrkPxlV2.curaprofile](https://assets.drkpxl.com/uploads/DrkPxlV2.curaprofile.zip)

### 140 mm/s Good Quality Profile - Fast

This profile is more experimental in nature currently but should net you fast performance with very little reduction in quality. The default infill here is "Lighting" which is great for making it print faster but will make a weaker print. Not an issue for a desktop model, but you may want to swap to Cubic or Gyroid if you want more structure.

[DrkPxl_Experimental_3.2_Final.curaprofile](https://assets.drkpxl.com/uploads/DrkPxl_Experimental_3.2_Final.curaprofile.zip)

### 150 mm/s Vase Mode Excellent quality

0.16 Vase Mode at a whopping 150 mm/s really great quality. Higher temp and lower fan so the extruder can lay down the PLA. Try it out and let me know your thoughts.

[DrkPxlV3.2VaseMode.curaprofile](https://assets.drkpxl.com/uploads/DrkPxlV3.2VaseMode.curaprofile.zip)

### How to Import:

1. Once you have .curaprofile downloaded open up Cura
2. Go to Preferences > Configure Cura
3. Click on Profiles
4. Then Import
5. The new profile should now be available in your dropdown list.

![Screen-Shot-2023-02-17-at-9](/images/01-am-1024x808.png)

