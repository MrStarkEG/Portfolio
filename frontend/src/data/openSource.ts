export interface OpenSourceContribution {
  id: number;
  project: string;
  title: string;
  description: string;
  repo: string;
  prUrl?: string;
  status: "Merged" | "Open" | "Closed";
  technologies: string[];
}

export const openSourceContributions: OpenSourceContribution[] = [
  {
    id: 1,
    project: "Scrapling • spiders",
    title: "Use os.replace for atomic checkpoint and cache writes on Windows",
    description: "Checkpoints and cached responses were moved into place with Path.rename(), which on Windows cannot overwrite an existing file. So every write after the first one failed: crawl resume broke, and the response cache silently kept serving stale data. Switched to Path.replace(), which overwrites atomically on every platform and is a no-op on Linux and macOS.",
    repo: "D4Vinci/Scrapling",
    prUrl: "https://github.com/D4Vinci/Scrapling/pull/344",
    status: "Merged",
    technologies: ["Python", "Web Scraping", "Cross-platform I/O"],
  },
  {
    id: 2,
    project: "OpenCTI • cisa-kev connector",
    title: "Default create_infrastructures to false",
    description: "CISA KEV entries are software products, and none of the STIX infrastructure-type values describe software. With the old default on, the connector emitted Infrastructure objects with an empty infrastructure_types field, which is not valid STIX and duplicates the Software object already in the same bundle. Flipped the default to false and kept the old behaviour as opt-in.",
    repo: "OpenCTI-Platform/connectors",
    prUrl: "https://github.com/OpenCTI-Platform/connectors/pull/6283",
    status: "Merged",
    technologies: ["Python", "OpenCTI", "STIX2"],
  },
  {
    id: 3,
    project: "OpenCTI • threat-actor-enrichment connector",
    title: "New connector to fix stale last_seen on threat actor groups",
    description: "Threat actor groups carried a last_seen date that trailed their real activity by months or years, so active groups looked dormant. Wrote a new external-import connector that recomputes last_seen from the group's related indicators and reports. It talks to OpenCTI only through the pycti API client, so it inherits the platform's access control and needs no Elasticsearch credentials.",
    repo: "OpenCTI-Platform/connectors",
    prUrl: "https://github.com/OpenCTI-Platform/connectors/pull/6044",
    status: "Merged",
    technologies: ["Python", "OpenCTI", "STIX2"],
  },
  {
    id: 4,
    project: "OpenCTI • mwdb connector",
    title: "Fix silent C2 data loss when config entries are dicts",
    description: "Upstream fix to the OpenCTI mwdb connector preventing silent data loss when malware config entries are dictionaries — hardening threat-intel ingest reliability across OpenCTI deployments.",
    repo: "OpenCTI-Platform/connectors",
    prUrl: "https://github.com/OpenCTI-Platform/connectors/pull/6041",
    status: "Merged",
    technologies: ["Python", "OpenCTI", "STIX2"],
  },
  {
    id: 5,
    project: "OpenCTI • mwdb connector",
    title: "Set indicator_types and x_opencti_main_observable_type on STIX Indicators",
    description: "Upstream contribution to the OpenCTI mwdb connector that properly sets indicator_types and x_opencti_main_observable_type on emitted STIX indicators — improving downstream STIX interoperability and detection rule generation.",
    repo: "OpenCTI-Platform/connectors",
    prUrl: "https://github.com/OpenCTI-Platform/connectors/pull/5881",
    status: "Merged",
    technologies: ["Python", "OpenCTI", "STIX2"],
  },
];
