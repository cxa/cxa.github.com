# Elder.js first impression

So many static site generators on the earth, they can be easily divided into two main categories:

- Purely static, like 11ty
- Full hydration, like Gatsby

If you need some interactive features on the client, you'll need to add extra layers on purely static content. Interactive mode enabled by default on full hydration, but it's too heavy for a site which mainly informative not app-like.

After some investigation, I found [Elder.js](https://github.com/Elderjs/elderjs) that supports partial hydration, which means you can control the necessary parts to be hydrated. I gave it a try, and you can check out <https://www.rocbank.com/en/> to see the result.

## Pros

- Svelte component, all benifits from Svelte ecosystem
- Static content by default, contrallable hydration
- Shortcodes

## Cons

- Lacks assets versioning
- No default way to seperate assets (in order to serve on CDN hosts)
- Rare communtiy plugins
