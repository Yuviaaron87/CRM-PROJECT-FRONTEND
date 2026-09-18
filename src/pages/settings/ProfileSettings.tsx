import {
  useEffect,
  useState,
} from "react";

import {
  Mail,
  Phone,
  UserRound,
} from "lucide-react";

import toast from "react-hot-toast";

import {
  settingsService,
} from "../../services/settingsService";

import type {
  ProfileSettingsData,
} from "../../types/settingTypes";

interface ProfileSettingsProps {
  data: ProfileSettingsData;

  onUpdate: (
    data: ProfileSettingsData
  ) => void;
}

interface FormErrors {
  fullName?: string;
  email?: string;
}

const ProfileSettings = ({
  data,
  onUpdate,
}: ProfileSettingsProps) => {
  const [form, setForm] =
    useState<ProfileSettingsData>(
      data
    );

  const [errors, setErrors] =
    useState<FormErrors>({});

  const [saving, setSaving] =
    useState(false);

  useEffect(() => {
    setForm(data);
  }, [data]);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } =
      event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));

    if (
      name === "fullName" ||
      name === "email"
    ) {
      setErrors((previous) => ({
        ...previous,
        [name]: undefined,
      }));
    }
  };

  const validate = () => {
    const newErrors: FormErrors = {};

    if (!form.fullName.trim()) {
      newErrors.fullName =
        "Full name is required";
    }

    if (!form.email.trim()) {
      newErrors.email =
        "Email is required";
    } else if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
        form.email
      )
    ) {
      newErrors.email =
        "Enter a valid email address";
    }

    setErrors(newErrors);

    return (
      Object.keys(newErrors)
        .length === 0
    );
  };

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    if (!validate()) {
      return;
    }

    try {
      setSaving(true);

      const updated =
        await settingsService.updateProfile(
          form
        );

      onUpdate(updated);

      toast.success(
        "Profile updated successfully"
      );
    } catch {
      toast.error(
        "Failed to update profile"
      );
    } finally {
      setSaving(false);
    }
  };

  const initials =
    form.fullName
      .split(" ")
      .filter(Boolean)
      .map((word) => word[0])
      .join("")
      .slice(0, 2)
      .toUpperCase() || "CA";

  return (
    <div>
      <div className="border-b border-slate-100 p-6">
        <h2 className="text-lg font-semibold text-slate-900">
          Profile Information
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Manage your personal
          information and CRM profile.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="p-6"
      >
        {/* Profile */}
        <div className="mb-8 flex items-center gap-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 text-xl font-bold text-blue-600">
            {initials}
          </div>

          <div>
            <p className="font-semibold text-slate-900">
              {form.fullName ||
                "CRM Admin"}
            </p>

            <p className="mt-1 text-sm text-slate-500">
              {form.jobTitle ||
                "Administrator"}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          {/* Full Name */}
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Full Name
            </label>

            <div className="relative">
              <UserRound
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                name="fullName"
                value={form.fullName}
                onChange={handleChange}
                placeholder="Enter full name"
                className={`w-full rounded-lg border py-2.5 pl-10 pr-4 text-sm outline-none focus:ring-2 ${
                  errors.fullName
                    ? "border-red-400 focus:ring-red-100"
                    : "border-slate-300 focus:border-blue-500 focus:ring-blue-100"
                }`}
              />
            </div>

            {errors.fullName && (
              <p className="mt-1 text-xs text-red-500">
                {errors.fullName}
              </p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Email Address
            </label>

            <div className="relative">
              <Mail
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="admin@example.com"
                className={`w-full rounded-lg border py-2.5 pl-10 pr-4 text-sm outline-none focus:ring-2 ${
                  errors.email
                    ? "border-red-400 focus:ring-red-100"
                    : "border-slate-300 focus:border-blue-500 focus:ring-blue-100"
                }`}
              />
            </div>

            {errors.email && (
              <p className="mt-1 text-xs text-red-500">
                {errors.email}
              </p>
            )}
          </div>

          {/* Phone */}
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Phone Number
            </label>

            <div className="relative">
              <Phone
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                name="phone"
                value={form.phone}
                onChange={handleChange}
                placeholder="+91 98765 43210"
                className="w-full rounded-lg border border-slate-300 py-2.5 pl-10 pr-4 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>
          </div>

          {/* Job Title */}
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Job Title
            </label>

            <input
              name="jobTitle"
              value={form.jobTitle}
              onChange={handleChange}
              placeholder="CRM Administrator"
              className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          {/* Department */}
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Department
            </label>

            <input
              name="department"
              value={form.department}
              onChange={handleChange}
              placeholder="Sales"
              className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>
        </div>

        <div className="mt-7 flex justify-end border-t border-slate-100 pt-5">
          <button
            type="submit"
            disabled={saving}
            className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {saving
              ? "Saving..."
              : "Save Changes"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProfileSettings;