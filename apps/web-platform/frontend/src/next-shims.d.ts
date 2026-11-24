/* eslint-disable @typescript-eslint/no-explicit-any */
declare module "next/dist/lib/metadata/types/metadata-interface.js" {
  export type ResolvingMetadata = Promise<any>;
  export type ResolvingViewport = Promise<any>;
}

declare module "next/types.js" {
  export type ResolvingMetadata = Promise<any>;
  export type ResolvingViewport = Promise<any>;
}

declare module "next/server.js" {
  export type NextRequest = import("next/server").NextRequest;
  export type NextResponse = import("next/server").NextResponse;
  export * from "next/server";
}
