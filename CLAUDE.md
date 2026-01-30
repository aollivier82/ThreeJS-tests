# Sky Island Society

A survival/simulation game built with Three.js. Watch tiny people compete to build the biggest house on a floating island.

## Concept

An eternal struggle for the biggest house! Families compete for resources - fathers chop trees and build houses while mothers collect apples to keep the family fed. If anyone in the family starves, the whole family mourns.

## Current Features

### World
- **Floating Island**: Grassy flat-top island floating in the sky with rocky underside
- **Trees & Regrowth**: 9 trees that can be chopped for wood, then regrow from saplings
- **Apples**: Trees grow apples that characters eat when hungry
- **Massive Clouds**: Enormous background clouds that drift and fade when blocking view
- **Day-Night Sky**: Sun during day, moon and stars at night with smooth transitions
- **Weather**: Dynamic weather system (sunny, cloudy, rainy, windy, snowy)

### Houses & Building
- **Family Houses**: When a baby is born, the family gets a house
- **Distinct Rooms**: Houses have individual rooms with walls, doors, windows, and roofs
- **Expansion**: Fathers keep adding rooms - houses can grow to 8+ rooms in a spiral pattern
- **Room Cost**: Each room costs 2 planks to build

### Family Roles
- **Fathers**: Get an axe when baby is born, chop trees (3 sec), carry planks, build rooms (2 sec each)
- **Mothers**: Stay near home, collect apples for the whole family when anyone gets hungry
- **Children**: Wander around, grow up, eventually find love and start their own families
- **Competition**: Families race to claim trees - first to reach a tree claims it

### Survival System
- **Hunger**: All characters get hungry over time (kids faster)
- **Starvation Death**: If hunger reaches 100, the character dies
- **Family Grief**: When someone starves, the whole family becomes sad for 30 seconds
- **Sadness Effects**: Sad characters walk 75% slower, heads face down, tears stream from eyes
- **Critical Hunger**: Fathers stop working and seek food when hunger > 80

### Characters
- **Unique Personalities**: Each character has a name, title, traits, mood, hobby, secret, and love style
- **Aging System**: Characters are born as babies, grow to children, teens, adults, middle-aged, then elders
- **Size Changes**: Babies are tiny (0.3x), grow to full size as adults, shrink slightly as elders
- **Death**: Characters pass on at age 100 or from starvation

### Life Simulation
- **Day-Night Cycle**: Days last 1 minute, nights last 10 seconds. Each cycle = 1 year of age
- **Sleeping**: At night, everyone lies down and sleeps with floating "zzz" above them
- **Flirting**: Adult characters flirt when they get close (70% chance to fall in love)
- **Couples**: Characters in love walk hand-in-hand (until they have a family home)
- **Reproduction**: Couples go to trees, make love, and have babies after a few seconds
- **Baby Cooldown**: 30 seconds between babies per couple

### UI
- **Profile Cards**: Tap any character to see their full profile, age, hunger, and relationship status
- **Changelog Banner**: Shows the latest feature addition on load
- **Name Labels**: Floating names above each character

## Characters

### Men
- Blorpo (The Daydreamer)
- Grunthus (The Grump with a Heart)
- Wimbledon (The Posh Disaster)
- Sir Jiggles (The Jolly Knight)
- Boingo (The Chaos Gremlin)
- Muffintop (The Cozy Baker)

### Women
- Sprinkles (The Sparkle Queen)
- Duchess Wobblebottom (The Elegant Wobbler)
- Fifi LaRue (The Mysterious Artiste)
- Buttercup (The Fierce Softy)
- Twinkletoes (The Dancing Dreamer)
- Lady Snuggums (The Supreme Cuddler)

## Tech Stack

- Three.js for 3D rendering
- Vite for dev server and bundling
- Vanilla JS, no framework

## Running

```bash
npm run dev
```

Opens at http://localhost:5173/

## Planned Features

- Seasons affecting tree growth and weather
- House upgrades and decorations
- Resource trading between families
- Family feuds over territory
