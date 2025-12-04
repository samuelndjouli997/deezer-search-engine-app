import type { CodegenConfig } from "@graphql-codegen/cli"

const config: CodegenConfig = {
  schema: "src/server/graphql/schema.ts",
  documents: ["src/**/*.{ts,tsx}"],
  ignoreNoDocuments: true,
  generates: {
    "./src/graphql/": {
      preset: "client",
      config: { documentMode: "string" }
    }
  }
}

export default config
