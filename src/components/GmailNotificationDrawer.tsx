import React, { useState, useEffect } from 'react';
import { 
  ADMIN_NOTIFICATION_EMAIL, 
  ADMIN_WHATSAPP_PHONE,
  getNotificationLogs, 
  notifyQuoteSubmission,
  requestGmailAuthorization,
  isGmailAuthorized,
  generateMailtoUrl,
  generateWhatsAppAlertUrl,
  sendEmailViaGateway
} from '../services/gmailNotificationService';
import { 
  Mail, 
  CheckCircle2, 
  X, 
  Send, 
  ShieldCheck, 
  Clock, 
  Bell, 
  FileText, 
  Calculator, 
  ExternalLink,
  Sparkles,
  RefreshCw,
  Key,
  Info,
  Smartphone,
  Check,
  AlertCircle,
  MessageCircle
} from 'lucide-react';

interface GmailNotificationDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GmailNotificationDrawer: React.FC<GmailNotificationDrawerProps> = ({
  isOpen,
  onClose
}) => {
  const [logs, setLogs] = useState<any[]>([]);
  const [isTesting, setIsTesting] = useState(false);
  const [testSent, setTestSent] = useState(false);
  const [isAuthorizing, setIsAuthorizing] = useState(false);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);
  const [activationSent, setActivationSent] = useState(false);
  const [isActivating, setIsActivating] = useState(false);

  const refreshLogs = () => {
    setLogs(getNotificationLogs());
    setIsAuthorized(isGmailAuthorized());
  };

  useEffect(() => {
    if (isOpen) {
      refreshLogs();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSendActivationEmail = async () => {
    setIsActivating(true);
    setActivationSent(false);
    try {
      await sendEmailViaGateway('🔔 FormSubmit Activation - Sri SJ Construction Portal', {
        'Action Needed': 'Please confirm this activation email to start receiving website quote and CV alerts directly in your inbox.',
        'Target Mailbox': ADMIN_NOTIFICATION_EMAIL,
        'Instruction': 'Check your inbox (and Spam/Junk folder if not in primary) for an email from FormSubmit and click "Activate Form".'
      });
      setActivationSent(true);
    } catch (e) {
      console.error(e);
    } finally {
      setIsActivating(false);
    }
  };

  const handleAuthorize = async () => {
    setIsAuthorizing(true);
    try {
      const token = await requestGmailAuthorization();
      if (token) {
        setIsAuthorized(true);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsAuthorizing(false);
      refreshLogs();
    }
  };

  const handleSendTestAlert = async () => {
    setIsTesting(true);
    setTestSent(false);

    try {
      await notifyQuoteSubmission({
        name: "Test Client Inquiry",
        companyName: "Sri SJ Construction Portal Test",
        phone: "+91 97754 42756",
        email: ADMIN_NOTIFICATION_EMAIL,
        serviceRequired: "DMC Piling • System Alert Verification",
        projectLocation: "Haldia Industrial Complex, WB",
        estimatedTimeline: "Immediate 2026",
        message: `This is a test notification confirming that commercial quotes and candidate CV uploads are being routed directly to ${ADMIN_NOTIFICATION_EMAIL}.`,
      });
      setTestSent(true);
      refreshLogs();
    } catch (e) {
      console.error(e);
    } finally {
      setIsTesting(false);
    }
  };

  const handleManualEmailOpen = (log: any) => {
    const subject = log.subject || `Inquiry Alert - ${log.id}`;
    let body = `SRI SJ CONSTRUCTION PRIVATE LIMITED\nNotification Ref: ${log.id}\nTarget Email: ${ADMIN_NOTIFICATION_EMAIL}\nTimestamp: ${new Date(log.timestamp).toLocaleString()}\n\n`;
    if (log.data) {
      Object.entries(log.data).forEach(([key, val]) => {
        if (val) body += `${key}: ${val}\n`;
      });
    }
    const mailto = generateMailtoUrl(subject, body, ADMIN_NOTIFICATION_EMAIL);
    window.open(mailto, '_blank');
  };

  const handleWhatsAppOpen = (log: any) => {
    let text = `*SRI SJ CONSTRUCTION - NEW WEBSITE ALERT*\nRef: ${log.id}\nType: ${log.type?.toUpperCase()}\nTarget Email: ${ADMIN_NOTIFICATION_EMAIL}\n\n`;
    if (log.data) {
      if (log.data.name || log.data.fullName) text += `*Name:* ${log.data.name || log.data.fullName}\n`;
      if (log.data.phone) text += `*Phone:* ${log.data.phone}\n`;
      if (log.data.serviceRequired) text += `*Service:* ${log.data.serviceRequired}\n`;
      if (log.data.positionAppliedFor) text += `*Position:* ${log.data.positionAppliedFor}\n`;
      if (log.data.projectLocation) text += `*Location:* ${log.data.projectLocation}\n`;
      if (log.data.cvFileName) text += `*CV File:* ${log.data.cvFileName}\n`;
    }
    const waUrl = generateWhatsAppAlertUrl(text);
    window.open(waUrl, '_blank');
  };

  const copyEmail = () => {
    navigator.clipboard.writeText(ADMIN_NOTIFICATION_EMAIL);
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white border border-slate-200 rounded-2xl max-w-2xl w-full max-h-[92vh] overflow-hidden shadow-2xl flex flex-col text-slate-800">
        
        {/* Header */}
        <div className="p-6 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-amber-500 text-slate-950">
              <Mail className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs font-bold text-amber-400 uppercase tracking-wider block">
                Notification &amp; Lead Delivery Center
              </span>
              <h3 className="text-xl font-bold font-['Space_Grotesk'] text-white">
                Live Alert Delivery Hub
              </h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-lg bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Target Recipient Banner */}
        <div className="p-4 bg-amber-500/10 border-b border-amber-500/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2.5 flex-wrap">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
            </span>
            <div className="text-xs">
              <span className="text-slate-500">Target Inbox:</span>{' '}
              <strong className="text-slate-900 font-mono font-bold text-sm">{ADMIN_NOTIFICATION_EMAIL}</strong>
            </div>
            <button 
              onClick={copyEmail}
              className="px-2 py-0.5 rounded bg-white hover:bg-slate-100 border border-slate-300 text-[11px] font-semibold text-slate-700 flex items-center gap-1 cursor-pointer transition-colors"
            >
              {copySuccess ? <Check className="w-3 h-3 text-emerald-600" /> : <Mail className="w-3 h-3 text-slate-500" />}
              <span>{copySuccess ? 'Copied' : 'Copy'}</span>
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleSendTestAlert}
              disabled={isTesting}
              className="px-3.5 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer disabled:opacity-50 shadow-sm"
            >
              {isTesting ? (
                <RefreshCw className="w-3.5 h-3.5 animate-spin" />
              ) : (
                <Send className="w-3.5 h-3.5" />
              )}
              <span>Send Test Lead Alert</span>
            </button>
          </div>
        </div>

        {/* Activation helper box */}
        <div className="p-4 bg-slate-50 border-b border-slate-200 text-xs space-y-2">
          <div className="flex items-start gap-2.5">
            <Info className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
            <div className="space-y-1.5">
              <p className="text-slate-800 font-semibold">
                How to activate instant inbox delivery to <span className="font-mono text-blue-700">{ADMIN_NOTIFICATION_EMAIL}</span>:
              </p>
              <p className="text-slate-600 leading-relaxed">
                1. Click the <strong>"Trigger Email Activation"</strong> button below to send the one-time activation link to <strong>{ADMIN_NOTIFICATION_EMAIL}</strong>.<br />
                2. Open your Gmail inbox (or Spam/Junk folder if not in primary) and click <strong>"Activate Form"</strong>.<br />
                3. All future quotes, CV uploads, and contact messages will arrive directly in your inbox!
              </p>
              
              <div className="pt-1 flex flex-wrap items-center gap-2">
                <button
                  onClick={handleSendActivationEmail}
                  disabled={isActivating}
                  className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer disabled:opacity-50"
                >
                  {isActivating ? <RefreshCw className="w-3 h-3 animate-spin" /> : <Sparkles className="w-3 h-3 text-amber-300" />}
                  <span>Trigger Email Activation to {ADMIN_NOTIFICATION_EMAIL}</span>
                </button>

                <a
                  href={`https://wa.me/919775442756?text=${encodeURIComponent('Hello Sri SJ Construction, testing WhatsApp lead alerts for ' + ADMIN_NOTIFICATION_EMAIL)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>Test WhatsApp Alert (+91 97754 42756)</span>
                </a>
              </div>
            </div>
          </div>

          {activationSent && (
            <div className="mt-2 p-2.5 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>
                Activation request dispatched! Please open <strong>{ADMIN_NOTIFICATION_EMAIL}</strong> (and check your <strong>Spam / Junk</strong> folder just in case) and click <strong>Activate Form</strong>.
              </span>
            </div>
          )}
        </div>

        {testSent && (
          <div className="mx-6 mt-4 p-3 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Test notification dispatched and logged for <strong>{ADMIN_NOTIFICATION_EMAIL}</strong>!</span>
            </div>
            <a
              href={generateMailtoUrl(
                `[TEST ALERT] Sri SJ Construction Lead Notification`,
                `This confirms that your alert delivery is active for ${ADMIN_NOTIFICATION_EMAIL}.`,
                ADMIN_NOTIFICATION_EMAIL
              )}
              target="_blank"
              rel="noreferrer"
              className="text-xs font-bold text-emerald-700 hover:underline flex items-center gap-1"
            >
              <span>Open in Gmail App</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        )}

        {/* Content Body / Log Table */}
        <div className="p-6 overflow-y-auto flex-1 space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-amber-600" />
              <span>Real-Time Leads &amp; CV Notification Feed ({logs.length})</span>
            </h4>
            <button
              onClick={refreshLogs}
              className="text-xs text-amber-700 hover:text-amber-900 font-semibold flex items-center gap-1 cursor-pointer"
            >
              <RefreshCw className="w-3 h-3" />
              <span>Refresh Feed</span>
            </button>
          </div>

          {logs.length === 0 ? (
            <div className="py-8 text-center rounded-xl bg-slate-50 border border-slate-200 space-y-2">
              <Mail className="w-10 h-10 text-slate-300 mx-auto" />
              <p className="text-sm font-semibold text-slate-700">Ready to Receive Inquiries</p>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Any client quote submissions or job CV uploads on the site will appear here instantly and route to <strong>{ADMIN_NOTIFICATION_EMAIL}</strong>.
              </p>
              <button
                onClick={handleSendTestAlert}
                className="mt-2 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 text-white text-xs font-semibold hover:bg-slate-800 transition-colors cursor-pointer"
              >
                <Send className="w-3 h-3 text-amber-400" />
                <span>Create First Test Entry</span>
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              {logs.map((log, index) => (
                <div 
                  key={index}
                  className="p-4 rounded-xl bg-slate-50 border border-slate-200 hover:border-amber-400 transition-colors text-xs space-y-2.5 shadow-sm"
                >
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      {log.type === 'career_cv' ? (
                        <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold uppercase text-[10px] flex items-center gap-1">
                          <FileText className="w-3 h-3" />
                          CV Upload
                        </span>
                      ) : log.type === 'quote' ? (
                        <span className="px-2 py-0.5 rounded bg-amber-100 text-amber-800 font-bold uppercase text-[10px] flex items-center gap-1">
                          <Calculator className="w-3 h-3" />
                          Quote Request
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 rounded bg-blue-100 text-blue-800 font-bold uppercase text-[10px] flex items-center gap-1">
                          <Mail className="w-3 h-3" />
                          Contact
                        </span>
                      )}
                      <span className="font-bold text-slate-900 font-mono">{log.id}</span>
                    </div>

                    <span className="text-[11px] text-slate-500 font-medium">
                      {new Date(log.timestamp).toLocaleString()}
                    </span>
                  </div>

                  <p className="font-bold text-slate-900 text-sm">{log.subject}</p>

                  <div className="text-xs text-slate-700 grid grid-cols-1 sm:grid-cols-2 gap-2 bg-white p-3 rounded-lg border border-slate-200/80">
                    {log.data?.fullName && <div><span className="text-slate-400 font-medium">Candidate:</span> <strong>{log.data.fullName}</strong></div>}
                    {log.data?.name && <div><span className="text-slate-400 font-medium">Client:</span> <strong>{log.data.name}</strong></div>}
                    {log.data?.phone && <div><span className="text-slate-400 font-medium">Phone:</span> <strong className="text-amber-700">{log.data.phone}</strong></div>}
                    {log.data?.email && <div><span className="text-slate-400 font-medium">Email:</span> <strong className="text-blue-700">{log.data.email}</strong></div>}
                    {log.data?.positionAppliedFor && <div><span className="text-slate-400 font-medium">Role:</span> <strong className="text-emerald-700">{log.data.positionAppliedFor}</strong></div>}
                    {log.data?.serviceRequired && <div><span className="text-slate-400 font-medium">Service:</span> <strong>{log.data.serviceRequired}</strong></div>}
                    {log.data?.projectLocation && <div><span className="text-slate-400 font-medium">Location:</span> <strong>{log.data.projectLocation}</strong></div>}
                    {log.data?.cvFileName && <div className="sm:col-span-2"><span className="text-slate-400 font-medium">CV Document:</span> <strong className="text-emerald-700">📁 {log.data.cvFileName}</strong></div>}
                  </div>

                  <div className="flex items-center justify-between pt-1 flex-wrap gap-2">
                    <span className="text-emerald-700 font-semibold text-[11px] flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Target: {ADMIN_NOTIFICATION_EMAIL}</span>
                    </span>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleWhatsAppOpen(log)}
                        className="px-2.5 py-1 rounded bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-[11px] flex items-center gap-1 transition-colors cursor-pointer"
                        title="Forward to WhatsApp"
                      >
                        <MessageCircle className="w-3 h-3" />
                        <span>WhatsApp Alert</span>
                      </button>

                      <button
                        onClick={() => handleManualEmailOpen(log)}
                        className="px-2.5 py-1 rounded bg-slate-900 hover:bg-slate-800 text-white font-bold text-[11px] flex items-center gap-1 transition-colors cursor-pointer"
                        title="Open direct compose in Gmail"
                      >
                        <Mail className="w-3 h-3 text-amber-400" />
                        <span>Open in Gmail</span>
                        <ExternalLink className="w-2.5 h-2.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Sri SJ Construction Live Inquiries &amp; Alerts Gateway</span>
          </div>
          <div className="flex items-center gap-2">
            <a
              href={`mailto:${ADMIN_NOTIFICATION_EMAIL}?subject=${encodeURIComponent('Direct Inquiry to Sri SJ Construction')}&body=${encodeURIComponent('Hello Sri SJ Construction Team,')}`}
              className="text-amber-800 font-bold hover:underline"
            >
              Compose direct email
            </a>
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-white font-bold cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
