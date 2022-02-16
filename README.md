# strapi-provider-upload-digitalocean-next

Transforms every image to jpeg, should be optional though (needs to be fixed)

```
yarn add strapi-provider-upload-digitalocean-next
```

or

```
npm install strapi-provider-upload-digitalocean-next

```

strapi_folder/config/plugins.js

```

module.exports = ({ env }) => ({
    upload: {
        config: {
        breakpoints: {
            large: 1600,
            medium: 1100,
            small: 700,
        },
        provider: "strapi-provider-upload-digitalocean-next",
        providerOptions: {
        accessKeyId: env("AWS_ACCESS_KEY_ID"),
        secretAccessKey: env("AWS_ACCESS_SECRET"),
        endpoint: env("AWS_DOMAIN"),
        settings: {
            awsUploadFolder: env("AWS_FOLDER"),
        },
        params: {
            Bucket: env("AWS_BUCKET"),
                },
            },
        },
    },
});

```

note:
AWS_DOMAIN should be the region and domain, for example using an ams3 at digital ocean gives the endpoint:

```
ams3.digitaloceanspaces.com
```
