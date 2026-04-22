'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Github, Lock } from 'lucide-react';
import { getProjects, type Project } from '@/lib/api';

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);
  const [expandedProject, setExpandedProject] = useState<number | null>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const data = await getProjects();
        setProjects(data);
      } catch (error) {
        console.error('Failed to fetch projects:', error);
      }
    };
    fetchProjects();
  }, []);

  const toggleProject = (projectId: number) => {
    // If clicking the same project, just close it
    if (expandedProject === projectId) {
      setExpandedProject(null);
      return;
    }

    // If another project is open, close it first, then open the new one
    if (expandedProject !== null) {
      setExpandedProject(null);
      // Wait for collapse animation to finish before opening new one
      setTimeout(() => {
        setExpandedProject(projectId);
      }, 300); // Half of the 0.5s animation duration
    } else {
      // No project open, just open the clicked one
      setExpandedProject(projectId);
    }
  };

  return (
    <section id="work" className="py-24 bg-background relative z-10">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 md:mb-24 flex items-end justify-between border-b border-white/20 pb-8"
        >
          <h2 className="text-[10vw] md:text-[6vw] font-bold leading-none tracking-tighter text-white">
            SELECTED<br />WORK
          </h2>
          <span className="text-sm md:text-base font-mono text-gray-400 mb-2">
            ({projects.length})
          </span>
        </motion.div>

        <div className="flex flex-col">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group border-b border-white/10"
              onMouseEnter={() => setHoveredProject(project.id)}
              onMouseLeave={() => setHoveredProject(null)}
              onClick={() => toggleProject(project.id)}
            >
              <div
                className="py-12 cursor-pointer relative overflow-hidden"
              >
                {/* Hover Background - Only visible on hover */}
                <motion.div
                  className="absolute inset-0 bg-primary-900/10 -z-10 origin-left"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: hoveredProject === project.id ? 1 : 0 }}
                  transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
                />

                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10 px-4">
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-4">
                      <span className="font-mono text-sm text-primary-400">0{index + 1}</span>
                      <h3 className={`text-4xl md:text-6xl font-bold transition-colors duration-300 ${hoveredProject === project.id ? 'text-primary-300' : 'text-white'
                        }`}>
                        {project.title}
                      </h3>
                    </div>
                    <div className="flex gap-2 ml-8">
                      {project.technologies.slice(0, 3).map((tech) => (
                        <span key={tech} className="text-xs uppercase tracking-wider text-gray-500 border border-white/10 rounded-full px-2 py-1">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className={`transition-all duration-300 transform ${hoveredProject === project.id ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'
                    }`}>
                    <ArrowUpRight className="w-12 h-12 text-primary-400" />
                  </div>
                </div>
              </div>

              {/* Expanded Content - No Image */}
              <AnimatePresence>
                {expandedProject === project.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.5, ease: [0.04, 0.62, 0.23, 0.98] }}
                    className="overflow-hidden bg-black/40 backdrop-blur-sm border-t border-white/5"
                  >
                    <div
                      className="p-8 md:p-12 mb-8 grid grid-cols-1 lg:grid-cols-2 gap-12"
                      onClick={(e) => e.stopPropagation()}
                    >
                      {/* Left Column: Content */}
                      <div className="flex flex-col gap-8">
                        <p className="text-xl md:text-2xl text-gray-300 leading-relaxed font-light" spellCheck={false}>
                          {project.description}
                        </p>

                        <div className="h-px w-full bg-linear-to-r from-transparent via-white/10 to-transparent" />

                        <div className="flex flex-col gap-8">
                          <div>
                            <h4 className="text-xs font-mono text-primary-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                              <span className="w-2 h-2 rounded-full bg-primary-500 animate-pulse" />
                              Tech Stack
                            </h4>
                            <div className="flex flex-wrap gap-2">
                              {project.technologies.map((tech) => (
                                <span key={tech} className="text-sm border border-white/10 bg-white/5 text-gray-300 px-3 py-1.5 rounded-md hover:border-primary-500/50 transition-colors cursor-default font-mono">
                                  {tech}
                                </span>
                              ))}
                            </div>
                          </div>

                          {project.confidential ? (
                            <div>
                              <h4 className="text-xs font-mono text-primary-400 uppercase tracking-widest mb-4">Status</h4>
                              <div className="flex items-center gap-3 p-4 rounded-lg border border-amber-500/20 bg-amber-500/5">
                                <div className="p-2 rounded-full bg-amber-500/10 text-amber-400">
                                  <Lock className="w-4 h-4" />
                                </div>
                                <div className="flex flex-col">
                                  <span className="font-mono text-sm text-amber-300">Confidential — closed source</span>
                                  <span className="text-xs text-gray-500">Proprietary project, can't be open-sourced for now.</span>
                                </div>
                              </div>
                            </div>
                          ) : (project.github_url || project.demo_url) && (
                            <div>
                              <h4 className="text-xs font-mono text-primary-400 uppercase tracking-widest mb-4">
                                {project.demo_url ? 'Deployment' : 'Source'}
                              </h4>
                              <div className="flex gap-6">
                                {project.github_url && (
                                  <a href={project.github_url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-white hover:text-primary-400 text-base group/link transition-colors">
                                    <div className="p-2 rounded-full bg-white/5 group-hover/link:bg-primary-500/20 transition-colors">
                                      <Github className="w-5 h-5" />
                                    </div>
                                    <span className="font-mono">source_code</span>
                                  </a>
                                )}
                                {project.demo_url && (
                                  <a href={project.demo_url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-white hover:text-primary-400 text-base group/link transition-colors">
                                    <div className="p-2 rounded-full bg-white/5 group-hover/link:bg-primary-500/20 transition-colors">
                                      <ArrowUpRight className="w-5 h-5" />
                                    </div>
                                    <span className="font-mono">live_demo</span>
                                  </a>
                                )}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Right Column: Cyber Terminal Visual */}
                      <div className="relative rounded-lg overflow-hidden border border-white/10 bg-[#0c0c0c]/80 font-mono text-sm hidden lg:block group/terminal hover:border-primary-500/30 transition-colors">
                        {/* Terminal Header */}
                        <div className="flex items-center justify-between px-4 py-3 bg-white/5 border-b border-white/5">
                          <div className="flex gap-2">
                            <div className="w-3 h-3 rounded-full bg-red-500/50" />
                            <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                            <div className="w-3 h-3 rounded-full bg-green-500/50" />
                          </div>
                          <div className="text-xs text-gray-500">bash — 80x24</div>
                        </div>

                        {/* Terminal Content */}
                        <div className="p-6 text-gray-400 space-y-2 h-full min-h-[300px]">
                          <div className="flex gap-2">
                            <span className="text-green-500">➜</span>
                            <span className="text-blue-500">~</span>
                            <span className="text-gray-300">cd {project.title.toLowerCase().replace(/\s+/g, '-')}</span>
                          </div>

                          <div className="flex gap-2">
                            <span className="text-green-500">➜</span>
                            <span className="text-blue-500">{project.title.toLowerCase().replace(/\s+/g, '-') || 'project'}</span>
                            <span className="text-gray-300">npm run analyze</span>
                          </div>

                          <div className="pt-2 space-y-1 opacity-80">
                            <p className="text-gray-500">[INFO] Initializing analysis engine...</p>
                            <p className="text-gray-500">[INFO] Loading modules: {project.technologies.slice(0, 3).join(', ')}...</p>
                            <p className="text-primary-400/80">[SUCCESS] Connectivity established</p>
                            <p className="text-gray-500">[INFO] Fetching metrics...</p>
                            <div className="h-2" />
                            <div className="grid grid-cols-2 gap-4 text-xs">
                              <div className="bg-white/5 p-3 rounded border border-white/5">
                                <span className="block text-gray-500 mb-1">COMPLEXITY</span>
                                <span className="text-green-400">HIGH</span>
                              </div>
                              <div className="bg-white/5 p-3 rounded border border-white/5">
                                <span className="block text-gray-500 mb-1">STATUS</span>
                                <span className="text-primary-400">DEPLOYED</span>
                              </div>
                            </div>
                            <div className="h-2" />
                            <p className="animate-pulse text-primary-500">_</p>
                          </div>

                          {/* Decorative Scan Line */}
                          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary-500/5 to-transparent h-[20%] w-full animate-scan pointer-events-none" />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}