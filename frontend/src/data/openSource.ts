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
    project: "OpenCTI • mwdb connector",
    title: "Fix silent C2 data loss when config entries are dicts",
    description: "Upstream fix to the OpenCTI mwdb connector preventing silent data loss when malware config entries are dictionaries — hardening threat-intel ingest reliability across OpenCTI deployments.",
    repo: "OpenCTI-Platform/connectors",
    prUrl: "https://github.com/OpenCTI-Platform/connectors/pull/6041",
    status: "Merged",
    technologies: ["Python", "OpenCTI", "STIX2"],
  },
  {
    id: 2,
    project: "OpenCTI • mwdb connector",
    title: "Set indicator_types and x_opencti_main_observable_type on STIX Indicators",
    description: "Upstream contribution to the OpenCTI mwdb connector that properly sets indicator_types and x_opencti_main_observable_type on emitted STIX indicators — improving downstream STIX interoperability and detection rule generation.",
    repo: "OpenCTI-Platform/connectors",
    prUrl: "https://github.com/OpenCTI-Platform/connectors/pull/5881",
    status: "Merged",
    technologies: ["Python", "OpenCTI", "STIX2"],
  },
];
