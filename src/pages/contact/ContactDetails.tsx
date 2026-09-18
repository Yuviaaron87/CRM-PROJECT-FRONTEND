import {
  ArrowLeft,
  BriefcaseBusiness,
  Building2,
  Calendar,
  Link2,
  Mail,
  MapPin,
  Pencil,
  Phone,
  Trash2,
} from "lucide-react";

import {
  useEffect,
  useState,
} from "react";

import {
  Link,
  useNavigate,
  useParams,
} from "react-router";

import toast from "react-hot-toast";

import Button from "../../components/Button";
import ConfirmDialog from "../../components/ConformDialog";
import LoadingSpinner from "../../components/LoadingSpinner";

import {
  ROUTES,
} from "../../constants/route";

import {
  contactService,
} from "../../services/contactService";

import {
  leadService,
} from "../../services/leadService";

import type {
  Contact,
} from "../../types/contactTypes";

import type {
  Lead,
} from "../../types/leadTypes";

import {
  formatDate,
} from "../../utils/formatDate";

const ContactDetails = () => {
  const { id } =
    useParams();

  const navigate =
    useNavigate();

  const [
    contact,
    setContact,
  ] =
    useState<Contact | null>(
      null
    );

  const [
    relatedLead,
    setRelatedLead,
  ] =
    useState<Lead | null>(
      null
    );

  const [
    loading,
    setLoading,
  ] = useState(true);

  const [
    deleteOpen,
    setDeleteOpen,
  ] = useState(false);

  const [
    deleting,
    setDeleting,
  ] = useState(false);

  useEffect(() => {
    const loadContact =
      async () => {
        if (!id) {
          return;
        }

        try {
          const data =
            await contactService.getById(
              id
            );

          if (!data) {
            toast.error(
              "Contact not found"
            );

            navigate(
              ROUTES.CONTACTS
            );

            return;
          }

          setContact(data);

          if (data.leadId) {
            const lead =
              await leadService.getById(
                data.leadId
              );

            setRelatedLead(
              lead ?? null
            );
          }
        } catch {
          toast.error(
            "Failed to load contact"
          );
        } finally {
          setLoading(false);
        }
      };

    loadContact();
  }, [id, navigate]);

  const handleDelete =
    async () => {
      if (!contact) {
        return;
      }

      try {
        setDeleting(true);

        await contactService.delete(
          contact.id
        );

        toast.success(
          "Contact deleted successfully"
        );

        navigate(
          ROUTES.CONTACTS
        );
      } catch {
        toast.error(
          "Failed to delete contact"
        );
      } finally {
        setDeleting(false);
      }
    };

  if (loading) {
    return (
      <LoadingSpinner text="Loading contact..." />
    );
  }

  if (!contact) {
    return null;
  }

  const fullName =
    `${contact.firstName} ${contact.lastName}`;

  return (
    <div className="space-y-6">
      <button
        type="button"
        onClick={() =>
          navigate(
            ROUTES.CONTACTS
          )
        }
        className="flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-blue-600"
      >
        <ArrowLeft size={17} />

        Back to Contacts
      </button>

      {/* Header */}

      <div className="flex flex-col justify-between gap-5 rounded-xl border border-slate-200 bg-white p-6 shadow-sm lg:flex-row lg:items-center">
        <div className="flex items-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-blue-100 text-lg font-bold text-blue-700">
            {contact.firstName
              .charAt(0)
              .toUpperCase()}

            {contact.lastName
              .charAt(0)
              .toUpperCase()}
          </div>

          <div>
            <h1 className="text-2xl font-bold text-slate-900">
              {fullName}
            </h1>

            <p className="mt-1 flex items-center gap-2 text-sm text-slate-500">
              <Building2
                size={15}
              />

              {contact.company}

              {contact.jobTitle &&
                ` • ${contact.jobTitle}`}
            </p>
          </div>
        </div>

        <div className="flex gap-3">
          <Button
            variant="secondary"
            onClick={() =>
              navigate(
                `/contacts/${contact.id}/edit`
              )
            }
          >
            <Pencil
              size={16}
            />

            Edit
          </Button>

          <Button
            variant="danger"
            onClick={() =>
              setDeleteOpen(
                true
              )
            }
          >
            <Trash2
              size={16}
            />

            Delete
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        <div className="space-y-6 xl:col-span-2">
          {/* Contact info */}

          <div className="rounded-xl border border-slate-200 bg-white shadow-sm">
            <div className="border-b border-slate-100 p-5">
              <h2 className="font-semibold text-slate-900">
                Contact Information
              </h2>
            </div>

            <div className="grid grid-cols-1 gap-6 p-5 md:grid-cols-2">
              <Info
                icon={Mail}
                label="Email"
                value={
                  contact.email
                }
              />

              <Info
                icon={Phone}
                label="Phone"
                value={
                  contact.phone
                }
              />

              <Info
                icon={
                  BriefcaseBusiness
                }
                label="Job Title"
                value={
                  contact.jobTitle ||
                  "Not provided"
                }
              />

              <Info
                icon={MapPin}
                label="Location"
                value={
                  [
                    contact.address,
                    contact.city,
                  ]
                    .filter(Boolean)
                    .join(", ") ||
                  "Not provided"
                }
              />
            </div>
          </div>

          {/* Notes */}

          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="font-semibold text-slate-900">
              Contact Notes
            </h2>

            <p className="mt-3 text-sm leading-7 text-slate-600">
              {contact.notes ||
                "No notes have been added for this contact."}
            </p>
          </div>
        </div>

        <div className="space-y-6">
          {/* Company */}

          <div className="rounded-xl border border-slate-200 bg-white shadow-sm">
            <div className="border-b border-slate-100 p-5">
              <h2 className="font-semibold text-slate-900">
                Company
              </h2>
            </div>

            <div className="space-y-5 p-5">
              <Info
                icon={Building2}
                label="Company"
                value={
                  contact.company
                }
              />

              <Info
                icon={Calendar}
                label="Created"
                value={formatDate(
                  contact.createdAt
                )}
              />
            </div>
          </div>

          {/* Related Lead */}

          <div className="rounded-xl border border-slate-200 bg-white shadow-sm">
            <div className="border-b border-slate-100 p-5">
              <h2 className="font-semibold text-slate-900">
                Related Lead
              </h2>
            </div>

            <div className="p-5">
              {relatedLead ? (
                <Link
                  to={`/leads/${relatedLead.id}`}
                  className="block rounded-lg border border-slate-200 p-4 transition hover:border-blue-300 hover:bg-blue-50"
                >
                  <div className="flex items-start gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-100 text-blue-600">
                      <Link2
                        size={17}
                      />
                    </div>

                    <div>
                      <p className="text-sm font-semibold text-slate-800">
                        {
                          relatedLead.name
                        }
                      </p>

                      <p className="mt-1 text-xs text-slate-500">
                        {
                          relatedLead.company
                        }
                      </p>

                      <p className="mt-2 text-xs font-medium text-blue-600">
                        View Lead →
                      </p>
                    </div>
                  </div>
                </Link>
              ) : (
                <p className="text-sm text-slate-500">
                  This contact is
                  not linked to a
                  lead.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      <ConfirmDialog
        open={deleteOpen}
        title="Delete Contact?"
        description={`Are you sure you want to delete ${fullName}? This action cannot be undone.`}
        loading={deleting}
        onCancel={() =>
          setDeleteOpen(false)
        }
        onConfirm={
          handleDelete
        }
      />
    </div>
  );
};

interface InfoProps {
  icon: React.ElementType;
  label: string;
  value: string;
}

const Info = ({
  icon: Icon,
  label,
  value,
}: InfoProps) => {
  return (
    <div className="flex gap-3">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-slate-500">
        <Icon size={17} />
      </div>

      <div>
        <p className="text-xs text-slate-400">
          {label}
        </p>

        <p className="mt-1 break-all text-sm font-medium text-slate-700">
          {value}
        </p>
      </div>
    </div>
  );
};

export default ContactDetails;