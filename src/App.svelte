<script>
  // https://assets.rasa.com/embeds/datocms-plugins/record-references/

  export let plugin;
  import { onMount, onDestroy } from 'svelte';
  import Client from './client';

  let isDev, isLoaded, referencesByType;

  onMount(async () => {
    const {
      developmentMode,
      datoCmsApiToken: datoToken,
    } = plugin.parameters.global;
    isDev = developmentMode || true;
    plugin.startAutoResizer();
    const { getReferences, getItemTypeFields } = Client(datoToken);
    const references = await getReferences(plugin.itemId).catch(console.warn);
    referencesByType = await references.data.reduce(async (obj, ref, idx) => {
      obj = await obj;
      const itemTypeId = ref.relationships.item_type.data.id;
      if (obj[String(itemTypeId)] == undefined) {
        const itemType = plugin.itemTypes[itemTypeId];
        const itemTypeName = itemType.attributes.name;
        const itemTypeTitleFieldId = itemType.relationships.title_field.data.id;
        const itemTypeFields = await getItemTypeFields(itemTypeId);
        const itemTypeTitleField = itemTypeFields.data.find(
          (field) => field.id == itemTypeTitleFieldId
        );
        obj[String(itemTypeId)] = {
          id: itemTypeId,
          name: itemTypeName,
          titleField: itemTypeTitleField,
          items: [],
        };
        if (isDev) {
        }
      }
      obj[String(itemTypeId)].items.push(ref);
      return obj;
    }, {});
    isLoaded = true;
  });

  onDestroy(() => {
    plugin && plugin.stopAutoResizer();
  });
</script>

<main class="plugin">
  {#if !isLoaded}
    <div class="placeholder">
      <img src="/vector/three-dots.svg" width="40" height="10" alt="" />
    </div>
  {:else}
    {#each Object.values(referencesByType) as itemType}
      <section class="prose">
        <h3>{itemType.name} Records</h3>
        <ul>
          {#each itemType.items as item}
            <li>
              <a
                href=""
                class="edit-link"
                on:click|preventDefault={() =>
                  plugin.navigateTo(
                    `/editor/item_types/${itemType.id}/items/${item.id}/edit`
                  )}
              >
                {item.attributes[itemType.titleField.attributes.api_key]}
              </a>
            </li>
          {/each}
        </ul>
      </section>
    {/each}
  {/if}
</main>

<style lang="scss">
  /* NB the following custom properties are available:

	--primary-color
	--accent-color
	--semi-transparent-accent-color
	--light-color
	--dark-color
 */

  :global {
    *,
    *::before,
    *::after {
      box-sizing: border-box;
    }

    body {
      margin: 0;
      padding: 0;
    }
    h1,
    h2,
    h3,
    h4,
    h5,
    h6,
    strong,
    th,
    b {
      font-weight: 500;
    }
    h1,
    h2,
    h3,
    h4,
    h5,
    h6,
    p,
    ul,
    ol,
    li {
      margin: 0;
    }
    ul,
    ol {
      padding: 0;
      list-style-position: inside;
    }
    label {
      user-select: none;
    }
  }

  .plugin {
    padding: 0 10px 10px;
    background-clip: content-box;
    font-family: colfax-web, Roboto, 'Helvetica Neue', Helvetica, Arial,
      sans-serif;
    color: #444 !important;
    quotes: auto;
    font-size: 14px;
    line-height: 1.4;
    color: hsl(0, 0, 48);
  }
  .prose {
    &:global {
      > h2 {
        font-size: 16px;
      }
      > h3 {
        font-size: 14px;
      }
      > p > img {
        padding-top: 10px;
        max-width: 100%;
        display: block;
      }
      > * {
        margin: 0;
      }
      > * + * {
        margin-top: 6px;
      }
      > * + h2 {
        margin-top: 16px;
      }
      > * + h3 {
        margin-top: 16px;
      }
      > ul {
        list-style: none;
        > li {
          padding: 0;
          margin-top: 6px;
        }
      }
    }
  }
  .edit-link {
    font: inherit;
    display: inline !important;
    appearance: none;
    border: none;
    background: none;
  }

  @font-face {
    font-family: 'colfax-web';
    src: url('https://use.typekit.net/af/bac079/00000000000000003b9acde4/27/l?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n4&v=3')
        format('woff2'),
      url('https://use.typekit.net/af/bac079/00000000000000003b9acde4/27/d?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n4&v=3')
        format('woff');
    font-display: auto;
    font-style: normal;
    font-weight: 400;
  }

  @font-face {
    font-family: 'colfax-web';
    src: url('https://use.typekit.net/af/522c51/00000000000000003b9acde6/27/l?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n5&v=3')
        format('woff2'),
      url('https://use.typekit.net/af/522c51/00000000000000003b9acde6/27/d?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n5&v=3')
        format('woff'),
      url('https://use.typekit.net/af/522c51/00000000000000003b9acde6/27/a?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n5&v=3')
        format('opentype');
    font-display: auto;
    font-style: normal;
    font-weight: 500;
  }
</style>
