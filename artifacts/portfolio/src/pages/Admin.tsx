import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { Lock, Save, LogOut, Eye, EyeOff, Loader2, CheckCircle2, Settings } from "lucide-react";
import { useGetProfile, useUpdateProfile, useAdminLogin } from "@workspace/api-client-react";

type ProfileFields = {
  name: string;
  role: string;
  location: string;
  email: string;
  bio: string;
  githubUrl: string;
  linkedinUrl: string;
  resumeUrl: string;
  tagline: string;
  githubUsername: string;
};

type LoginForm = { password: string };

function LoginScreen({ onLogin }: { onLogin: (pw: string) => void }) {
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState("");
  const { register, handleSubmit, formState: { isSubmitting } } = useForm<LoginForm>();
  const loginMutation = useAdminLogin();

  const onSubmit = async (data: LoginForm) => {
    setError("");
    loginMutation.mutate(
      { data: { password: data.password } },
      {
        onSuccess: () => onLogin(data.password),
        onError: () => setError("Incorrect password. Please try again."),
      }
    );
  };

  return (
    <div className="min-h-screen bg-[#060812] flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div className="bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-md shadow-2xl">
          <div className="flex flex-col items-center mb-8">
            <div className="w-16 h-16 rounded-2xl bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center mb-4">
              <Lock className="w-8 h-8 text-cyan-400" />
            </div>
            <h1 className="text-2xl font-bold text-white">Admin Panel</h1>
            <p className="text-white/50 text-sm mt-1">Enter your password to continue</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="relative">
              <input
                type={showPw ? "text" : "password"}
                placeholder="Admin password"
                {...register("password", { required: true })}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 pr-12 text-white placeholder-white/30 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/30 transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPw(!showPw)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/70 transition-colors"
              >
                {showPw ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>

            {error && (
              <p className="text-red-400 text-sm bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loginMutation.isPending}
              className="w-full bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-white font-semibold py-3 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-60"
            >
              {loginMutation.isPending ? (
                <><Loader2 className="w-5 h-5 animate-spin" /> Verifying...</>
              ) : (
                <><Lock className="w-5 h-5" /> Login</>
              )}
            </button>
          </form>

          <p className="text-center text-white/30 text-xs mt-6">
            <a href="/" className="hover:text-white/60 transition-colors">← Back to Portfolio</a>
          </p>
        </div>
      </motion.div>
    </div>
  );
}

function AdminDashboard({ adminPassword, onLogout }: { adminPassword: string; onLogout: () => void }) {
  const { data: profile, isLoading, refetch } = useGetProfile();
  const updateMutation = useUpdateProfile();
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");

  const { register, handleSubmit, reset, formState: { isDirty } } = useForm<ProfileFields>();

  useEffect(() => {
    if (profile) {
      reset({
        name: profile.name,
        role: profile.role,
        location: profile.location,
        email: profile.email,
        bio: profile.bio,
        githubUrl: profile.githubUrl,
        linkedinUrl: profile.linkedinUrl,
        resumeUrl: profile.resumeUrl,
        tagline: profile.tagline,
        githubUsername: profile.githubUsername,
      });
    }
  }, [profile, reset]);

  const onSubmit = (data: ProfileFields) => {
    setError("");
    setSaved(false);
    updateMutation.mutate(
      { data: { ...data, adminPassword } },
      {
        onSuccess: () => {
          setSaved(true);
          refetch();
          setTimeout(() => setSaved(false), 3000);
        },
        onError: (err: Error) => {
          setError(err.message || "Failed to save changes.");
        },
      }
    );
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#060812] flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-cyan-400 animate-spin" />
      </div>
    );
  }

  const fields: { key: keyof ProfileFields; label: string; placeholder: string; type?: string; multiline?: boolean }[] = [
    { key: "name", label: "Full Name", placeholder: "e.g. Sinde Saikiran" },
    { key: "role", label: "Role / Title", placeholder: "e.g. Computer Science Student" },
    { key: "location", label: "Location", placeholder: "e.g. India" },
    { key: "email", label: "Email Address", placeholder: "e.g. you@example.com", type: "email" },
    { key: "githubUsername", label: "GitHub Username", placeholder: "e.g. SindeSaikiran" },
    { key: "githubUrl", label: "GitHub URL", placeholder: "https://github.com/..." },
    { key: "linkedinUrl", label: "LinkedIn URL", placeholder: "https://linkedin.com/in/..." },
    { key: "resumeUrl", label: "Resume URL", placeholder: "https://drive.google.com/..." },
    { key: "tagline", label: "Hero Tagline", placeholder: "Short tagline shown under your name in Hero section" },
    { key: "bio", label: "Bio / About Me", placeholder: "Tell the world about yourself...", multiline: true },
  ];

  return (
    <div className="min-h-screen bg-[#060812] text-white">
      {/* Header */}
      <div className="border-b border-white/10 bg-white/5 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-3xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Settings className="w-6 h-6 text-cyan-400" />
            <span className="font-bold text-lg">Profile Editor</span>
          </div>
          <div className="flex items-center gap-3">
            <a href="/" className="text-white/50 hover:text-white text-sm transition-colors">
              View Portfolio →
            </a>
            <button
              onClick={onLogout}
              className="flex items-center gap-2 text-white/50 hover:text-red-400 transition-colors text-sm px-3 py-1.5 rounded-lg hover:bg-red-500/10"
            >
              <LogOut className="w-4 h-4" /> Logout
            </button>
          </div>
        </div>
      </div>

      {/* Form */}
      <div className="max-w-3xl mx-auto px-4 py-10">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-1">Edit Your Profile</h2>
            <p className="text-white/50 text-sm">Changes will reflect live on your portfolio as soon as you save.</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {fields.filter(f => !f.multiline && f.key !== "bio" && f.key !== "tagline").map(({ key, label, placeholder, type }) => (
                <div key={key}>
                  <label className="block text-xs font-semibold text-white/50 uppercase tracking-wider mb-2">
                    {label}
                  </label>
                  <input
                    type={type || "text"}
                    placeholder={placeholder}
                    {...register(key)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/20 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/20 transition-all text-sm"
                  />
                </div>
              ))}
            </div>

            {/* Tagline - full width */}
            <div>
              <label className="block text-xs font-semibold text-white/50 uppercase tracking-wider mb-2">
                Hero Tagline
              </label>
              <input
                type="text"
                placeholder="Short tagline shown in the hero section"
                {...register("tagline")}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/20 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/20 transition-all text-sm"
              />
            </div>

            {/* Bio - full width textarea */}
            <div>
              <label className="block text-xs font-semibold text-white/50 uppercase tracking-wider mb-2">
                Bio / About Me
              </label>
              <textarea
                placeholder="Tell the world about yourself..."
                rows={5}
                {...register("bio")}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/20 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/20 transition-all text-sm resize-none"
              />
            </div>

            {error && (
              <div className="text-red-400 text-sm bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3">
                {error}
              </div>
            )}

            {saved && (
              <motion.div
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-2 text-green-400 text-sm bg-green-500/10 border border-green-500/20 rounded-xl px-4 py-3"
              >
                <CheckCircle2 className="w-4 h-4" /> Profile saved successfully! Your portfolio is updated.
              </motion.div>
            )}

            <button
              type="submit"
              disabled={updateMutation.isPending || (!isDirty && !saved)}
              className="w-full bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-white font-semibold py-3.5 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {updateMutation.isPending ? (
                <><Loader2 className="w-5 h-5 animate-spin" /> Saving...</>
              ) : (
                <><Save className="w-5 h-5" /> Save Changes</>
              )}
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  );
}

export default function Admin() {
  const [adminPassword, setAdminPassword] = useState<string | null>(() =>
    sessionStorage.getItem("admin_pw")
  );

  const handleLogin = (pw: string) => {
    sessionStorage.setItem("admin_pw", pw);
    setAdminPassword(pw);
  };

  const handleLogout = () => {
    sessionStorage.removeItem("admin_pw");
    setAdminPassword(null);
  };

  if (!adminPassword) {
    return <LoginScreen onLogin={handleLogin} />;
  }

  return <AdminDashboard adminPassword={adminPassword} onLogout={handleLogout} />;
}
