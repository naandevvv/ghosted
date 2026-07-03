import type { NextConfig } from "next";
import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";

const nextConfig: NextConfig = {};

export default nextConfig;

// Permet d'accéder aux bindings Cloudflare (secrets, etc.) pendant `next dev`.
void initOpenNextCloudflareForDev();
