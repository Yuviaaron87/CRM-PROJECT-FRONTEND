import {
  ArrowLeft,
} from "lucide-react";

import {
  useEffect,
  useState,
} from "react";

import {
  useNavigate,
  useParams,
} from "react-router";

import toast from "react-hot-toast";

import ContactForm from "../../pages/contact/ContactForm";
import LoadingSpinner from "../../components/LoadingSpinner";

import {
  ROUTES,
} from "../../constants/route";

import {
  contactService,
} from "../../services/contactService";

import type {
  ContactFormData,
} from "../../types/contactTypes";

const EditContact = () => {
  const { id } =
    useParams();

  const navigate =
    useNavigate();

  const [
    initialValues,
    setInitialValues,
  ] =
    useState<ContactFormData | null>(
      null
    );

  const [
    loading,
    setLoading,
  ] = useState(true);

  const [
    saving,
    setSaving,
  ] = useState(false);

  useEffect(() => {
    const loadContact =
      async () => {
        if (!id) {
          return;
        }

        try {
          const contact =
            await contactService.getById(
              id
            );

          if (!contact) {
            toast.error(
              "Contact not found"
            );

            navigate(
              ROUTES.CONTACTS
            );

            return;
          }

          setInitialValues({
            firstName:
              contact.firstName,

            lastName:
              contact.lastName,

            email:
              contact.email,

            phone:
              contact.phone,

            company:
              contact.company,

            jobTitle:
              contact.jobTitle,

            leadId:
              contact.leadId ??
              "",

            address:
              contact.address,

            city:
              contact.city,

            notes:
              contact.notes,
          });
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

  const handleSubmit =
    async (
      data: ContactFormData
    ) => {
      if (!id) {
        return;
      }

      try {
        setSaving(true);

        await contactService.update(
          id,
          data
        );

        toast.success(
          "Contact updated successfully"
        );

        navigate(
          `/contacts/${id}`
        );
      } catch {
        toast.error(
          "Failed to update contact"
        );
      } finally {
        setSaving(false);
      }
    };

  if (
    loading ||
    !initialValues
  ) {
    return (
      <LoadingSpinner text="Loading contact..." />
    );
  }

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <div>
        <button
          type="button"
          onClick={() =>
            navigate(
              `/contacts/${id}`
            )
          }
          className="mb-4 flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-blue-600"
        >
          <ArrowLeft
            size={17}
          />

          Back to Contact
        </button>

        <h1 className="text-2xl font-bold text-slate-900">
          Edit Contact
        </h1>

        <p className="mt-1 text-sm text-slate-500">
          Update contact
          information and CRM
          relationship.
        </p>
      </div>

      <ContactForm
        initialValues={
          initialValues
        }
        loading={saving}
        submitLabel="Update Contact"
        onSubmit={
          handleSubmit
        }
        onCancel={() =>
          navigate(
            `/contacts/${id}`
          )
        }
      />
    </div>
  );
};

export default EditContact;