---
slug: "/stripe-multi-client-factory-pattern"
title: "Stripe Multi-Client Factory Pattern in NestJS"
date: "2024-09-26"
tags: ["NestJS", "Stripe"]
published: true
meta:
  description: "Learn how to integrate multiple Stripe accounts into your NestJS application using the Factory Pattern for cleaner code, scalability, and maintainability."
  keywords: "NestJS, Stripe, Factory Pattern, Multi-Client Integration, Payment Processing, Software Development, Code Optimization"
  author: "Daniel Guldberg Aaes"
  image: "/og/stripe-multi-client-factory-pattern.png"
  excerpt: "Discover how to streamline Stripe account integration in NestJS applications using the Factory Pattern. Say goodbye to messy code and hello to scalability!"
---

## Navigating the Stripe Jungle in NestJS: A Personal Adventure.

Hey there, fellow code wranglers! 👋

Ever tried integrating multiple Stripe accounts into a NestJS application? If you have, you probably know it's like trying to juggle flaming torches while riding a unicycle—challenging and slightly dangerous! I recently embarked on this wild adventure, and I want to share my journey with you. So grab your favorite snack (I won't judge if it's a whole pizza 🍕) and let's dive in!

## The Great Multi-Market Challenge

So, picture this: I'm working on an app that's expanding into multiple markets—specifically the UK and Scandinavia. Exciting, right? But here's the catch: each market has its own Stripe account because of different currencies, regulations, and all that fun stuff.

At first, I thought, "No biggie, I'll just set up multiple Stripe clients." Fast forward a few days, and my codebase looked like a tangled mess of Stripe instances and conditional logic. Not exactly the elegant solution I was hoping for.

### The Struggles Were Real:

- **Code Duplication**: I was copy-pasting code like it was going out of style.
- **Maintenance Headaches**: Adding a new market felt like defusing a bomb.
- **Sleepless Nights**: I kept dreaming about Stripe errors chasing me down dark alleys. Not fun.

## The Eureka Moment 💡

After one too many cups of coffee (and maybe a donut or two 🍩), it hit me: **Why not use a factory pattern to manage these Stripe clients?**

I know, I know—it sounds fancy. But stick with me! This approach not only cleaned up my code but also made it super easy to add new markets in the future. Let's break it down.

## Crafting the Solution 🛠️

### Step 1: Tidy Up with NestJS Modules

First things first, I organized my `StripeModule` to keep everything neat and tidy. Kind of like cleaning your room before starting a new project—you can actually find things!

```typescript
@Module({
  imports: [
    // ...other modules
  ],
  providers: [
    // ...providers (we'll get to these)
  ],
  controllers: [StripeController],
  exports: [StripeService],
})
export class StripeModule {}
```

### Step 2: Inject Multiple Stripe Clients Like a Pro

Instead of scattering Stripe client initializations all over the place (which was giving me serious whiplash), I set up providers for each market's Stripe client.

```typescript
@Module({
  imports: [
    // ...other modules
  ],
  providers: [
    {
      provide: "GB_STRIPE_CLIENT",
      useFactory: () =>
        new Stripe(process.env.STRIPE_GB_SECRET_KEY, {
          apiVersion: "2024-XX-XX",
        }),
    },
    {
      provide: "DK_STRIPE_CLIENT",
      useFactory: () =>
        new Stripe(process.env.STRIPE_DK_SECRET_KEY, {
          apiVersion: "2024-XX-XX",
        }),
    },
    {
      provide: StripeClientFactory,
      useFactory: (ukClient: Stripe, scandiClient: Stripe) =>
        new StripeClientFactory(ukClient, scandiClient),
      inject: ["GB_STRIPE_CLIENT", "DK_STRIPE_CLIENT"],
    },
  ],
  controllers: [StripeController],
  exports: [StripeService],
})
export class StripeModule {}
```

Now, I had a centralised configuration, and my codebase was already breathing a sigh of relief.

### Step 3: Meet the StripeClientFactory 🎩

This is where the magic happens. I created a `StripeClientFactory` class—a fancy name for a helper that fetches the right Stripe client based on the market.

```typescript
export class StripeClientFactory {
  private stripeClients: Map<Market, Stripe>;

  constructor(
    private readonly gbClient: Stripe,
    private readonly dkClient: Stripe
  ) {
    this.stripeClients = new Map<Market, Stripe>([
      ["GB", this.ukClient],
      ["DK", this.dkClient],
    ]);
  }

  getClient(market: Market): Stripe {
    const client = this.stripeClients.get(market);

    if (!client) {
      throw new Error(`No Stripe client found for market: ${market}`);
    }
    return client;
  }
}
```

#### Why I Love This Factory Pattern:

- **Centralized Control**: All Stripe clients are managed in one spot. It's like having a remote control for your TV instead of getting up to change the channel every time (remember those days?).
- **Easy Scalability**: Adding a new market? Just add a new client to the factory. Boom! Done.
- **Cleaner Codebase**: My code went from looking like a plate of spaghetti to a well-organized toolbox.

## The Sweet Taste of Victory 🏆

After implementing this pattern, integrating multiple Stripe accounts felt less like wrestling a bear and more like a walk in the park. Here's what I gained:

1. **Scalability**: We're ready to conquer new markets without breaking a sweat.
2. **Maintainability**: The next developer who looks at this code might just send me a thank-you note.
3. **Reusability**: No more duplicated code means fewer bugs and more time for coffee breaks.
4. **Peace of Mind**: I can finally sleep without dreaming of Stripe errors lurking in the shadows.

## Lessons Learned (or How Not to Lose Your Mind)

- **Don't Reinvent the Wheel**: Use patterns and practices that have stood the test of time.
- **Centralize Configuration**: It saves you from future headaches.
- **Embrace NestJS Features**: Dependency injection is your friend. Invite it to your birthday party.

## A Quick Recap (Because Who Doesn't Love Summaries?)

- **Problem**: Managing multiple Stripe accounts for different markets was messy and unscalable.
- **Solution**: Implement a factory pattern to handle Stripe clients efficiently.
- **Result**: Cleaner code, easier scalability, and a happier development team (that's me!).

## Final Thoughts 🌟

Integrating Stripe doesn't have to be a hair-pulling experience. With a bit of planning and the right patterns, you can create a scalable and maintainable solution that would make any developer proud.

So, next time you find yourself in the midst of a multi-market integration, remember: there's a better way. And maybe, just maybe, you'll think back to this blog post and smile. Or at least not grimace. I'll take that as a win!

**I know there still are ways to improve this, instead of making a `StripeFactory` we could build a `PaymentFactory` which can receive various payment clients and make our own payment abstraction so we are ready for when stripe decides to shut us down and we quickly have to move to another payment provider over night, and yes this have happened to me. I promise you it was nothing sketchy or illegal, just a payment provider who was hard to work with.**

Thanks for joining me on this little adventure.

Happy coding! 🎉
