import React from 'react';
import { motion } from 'framer-motion';

const experiences = [
  {
    company: 'ICICI Lombard GIC',
    role: 'Backend Developer, Payments Platform',
    period: 'August 2025 – Present',
    points: [
      'Lead developer of a centralized payments platform processing INR 60 crore+ in monthly payments across all of ICICI Lombard’s insurance products, consolidating 15+ fragmented legacy payment systems into a single service.',
      'Integrated the Juspay payment gateway and its payment webhooks for initiation, status tracking and refunds, and built outbound webhooks that push payment events to the 40+ product teams integrated with the platform; architected as .NET Core microservices on PostgreSQL, sustaining 99.9% uptime.',
      'Designed Hangfire background jobs and Kafka-based event processing (100,000+ events daily) for policy generation and refund workflows, with retry and fallback strategies that automatically process pending payment cases.',
      'Standardized the payment flow with unified error handling and end-to-end audit logging, cutting the time to trace a failed payment from 2–3 hours to 15–30 minutes.',
      'Single-handedly built a support dashboard showing the complete payment-to-policy trail, with a one-click resolve action that re-runs the remaining flow from whichever step a case is stuck at, reducing support ticket resolution time by 40%.',
      'Built a Model Context Protocol (MCP) server in .NET exposing 7+ insurance workflows as tools for AI agents, including policy enquiry, quote and proposal generation, payment link generation, policy issuance, claim resolution and self-inspection.',
    ],
  },
  {
    company: 'Aignosis',
    role: 'AI / Software Engineer Intern',
    period: 'January 2025 – July 2025',
    points: [
      'Architected the end-to-end backend in Python and FastAPI with auto-generated clinical reports, serving 1,500+ autism screenings weekly.',
      'Built the computer-vision pipeline behind the webcam screener: CNN-based gaze estimation (PyTorch, MediaPipe facial landmarks), saccade extraction and head-pose calibration on consumer hardware, turning a 5-minute stimulus video into the feature set scored by the risk model.',
      'Ran 500+ supervised screening sessions across clinics and preschools, building a labeled edge-case dataset used for model retraining that reduced calibration dropout among toddlers.',
    ],
  },
  {
    company: 'Amazon ML School',
    role: 'ML Program Participant',
    period: '2024',
    points: [
      'Top 3K globally',
      'Worked on 3 real-world ML applications',
    ],
  },
  {
    company: 'Optevo',
    role: 'SDE Intern',
    period: '2023',
    points: [
      'Full-stack: frontend + backend',
      'Reduced latency and improved system performance',
    ],
  },
];

export default function Experience() {
  return (
    <section id="experience" className="max-w-4xl mx-auto px-6 py-20">
      <motion.h2
        className="text-3xl md:text-4xl font-bold text-neonblue mb-10 text-center"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
      >
        Professional Experience
      </motion.h2>
      <ol className="relative border-l-2 border-neonred ml-4">
        {experiences.map((exp, i) => (
          <motion.li
            key={exp.company}
            className="mb-12 ml-6"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 * i }}
            viewport={{ once: true }}
          >
            <span className="absolute -left-3 flex items-center justify-center w-6 h-6 bg-neonred rounded-full ring-4 ring-navy text-navy font-bold">{i+1}</span>
            <div className="bg-darkgray/80 p-6 rounded-lg shadow-lg">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
                <span className="text-xl font-semibold text-neonred">{exp.company}</span>
                <span className="text-sm text-neonblue font-medium">{exp.role} &bull; {exp.period}</span>
              </div>
              <ul className="list-disc ml-5 text-lightgray space-y-1">
                {exp.points.map((pt, j) => (
                  <li key={j}>{pt}</li>
                ))}
              </ul>
            </div>
          </motion.li>
        ))}
      </ol>
    </section>
  );
}
