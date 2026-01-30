# Sky Island Society

A simulation of society game built with Three.js. Watch tiny people live their lives on a floating island in the sky.

## Concept

A peaceful floating island where little characters are born, grow up, fall in love, have babies, age, and eventually pass on. The player observes and interacts by tapping on characters to learn about their personalities.

## Current Features

### World
- **Floating Island**: Grassy flat-top island floating in the sky with rocky underside
- **Trees with Apples**: 6 trees that grow apples, characters eat when hungry
- **Massive Clouds**: Enormous background clouds that drift and fade when blocking view
- **Day-Night Sky**: Sun during day, moon and stars at night with smooth transitions
- **Peaceful Lighting**: Golden hour sun during day, soft moonlight at night

### Characters
- **Unique Personalities**: Each character has a name, title, traits, mood, hobby, secret, and love style
- **Aging System**: Characters are born as babies, grow to children, teens, adults, middle-aged, then elders
- **Size Changes**: Babies are tiny (0.3x), grow to full size as adults, shrink slightly as elders
- **Death**: Characters pass on at age 100

### Life Simulation
- **Day-Night Cycle**: Days last 1 minute, nights last 10 seconds. Each cycle = 1 year of age
- **Sleeping**: At night, everyone lies down and sleeps with floating "zzz" above them
- **Hunger**: Characters get hungry over time and seek apples from trees
- **Flirting**: Adult characters flirt when they get close (70% chance to fall in love)
- **Couples**: Characters in love walk hand-in-hand together
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

- Weather effects (sunshine, wind, rain, snow)
- More interactions and activities
- Housing/shelter building
- Seasons
