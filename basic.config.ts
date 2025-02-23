// basic.config.ts lets you define the schema for your database
// after updating this file, you may need to restart the dev server
// docs: https://docs.basic.tech/info/schema 

export const schema = {
  project_id: "b37f5656-8ece-48de-b342-2bcdc2560e95",
  version: 0,
  tables: {
    coais: {
      type: "collection",
      fields: {
        state: {
          type: "string",
          indexed: true
        }
      }
    }
  },
}