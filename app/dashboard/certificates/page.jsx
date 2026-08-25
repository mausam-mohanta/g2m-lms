"use client";

import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import { certificates } from "@/data/mockData";
import { Award, Download, Share2, ExternalLink, CheckCircle } from "lucide-react";

export default function CertificatesPage() {
  return (
    <div className="max-w-5xl mx-auto space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-surface-900">My Certificates</h1>
        <p className="text-surface-500 mt-1">Verified credentials earned through your learning journey</p>
      </div>

      {certificates.length === 0 ? (
        <Card className="text-center py-16">
          <Award size={48} className="mx-auto text-surface-300 mb-4" />
          <h3 className="font-semibold text-surface-700 mb-2">No certificates yet</h3>
          <p className="text-sm text-surface-500">Complete courses to earn verified certificates</p>
        </Card>
      ) : (
        <div className="grid gap-6">
          {certificates.map((cert) => (
            <Card key={cert.id} className="overflow-hidden !p-0">
              <div className="bg-gradient-to-r from-primary-500 to-accent-500 p-8 text-white text-center relative">
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0djZoNnYtNmgtNnptMC0zMHY2aDZ2LTZoLTZ6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-30" />
                <div className="relative">
                  <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center mx-auto mb-4">
                    <Award size={32} />
                  </div>
                  <p className="text-white/80 text-sm mb-2">Certificate of Completion</p>
                  <h2 className="text-2xl font-bold mb-1">{cert.courseName}</h2>
                  <p className="text-white/70">Awarded to {cert.instructor}</p>
                </div>
              </div>
              <div className="p-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <CheckCircle size={14} className="text-green-500" />
                      <span className="text-sm text-surface-600">Completed: {new Date(cert.completionDate).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-surface-600">Credential ID: <span className="font-mono font-medium text-surface-800">{cert.credentialId}</span></span>
                    </div>
                    <div className="flex flex-wrap gap-1.5 mt-2">
                      {cert.skills.map((skill) => (
                        <Badge key={skill} color="blue">{skill}</Badge>
                      ))}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" icon={Download}>Download</Button>
                    <Button variant="outline" size="sm" icon={Share2}>Share</Button>
                    <Button size="sm" icon={ExternalLink}>Verify</Button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
