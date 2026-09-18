import {
  ArrowLeft,
} from "lucide-react";

import {
  useState,
} from "react";

import {
  useNavigate,
} from "react-router";

import toast from "react-hot-toast";

import ContactForm from "../../pages/contact/ContactForm";

import {
  ROUTES,
} from "../../constants/route";

import {
  contactService,
} from "../../services/contactService";

import type {
  ContactFormData,
} from "../../types/contactTypes";

const AddContact = () => {
  const navigate =
    useNavigate();

  const [
    loading,
    setLoading,
  ] = useState(false);

  const handleSubmit =
    async (
      data: ContactFormData
    ) => {
      try {
        setLoading(true);

        const contact =
          await contactService.create(
            data
          );

        toast.success(
          "Contact created successfully"
        );

        navigate(
          `/contacts/${contact.id}`
        );
      } catch {
        toast.error(
          "Failed to create contact"
        );
      } finally {
        setLoading(false);
      }
    };

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <div>
        <button
          type="button"
          onClick={() =>
            navigate(
              ROUTES.CONTACTS
            )
          }
          className="mb-4 flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-blue-600"
        >
          <ArrowLeft
            size={17}
          />

          Back to Contacts
        </button>

        <h1 className="text-2xl font-bold text-slate-900">
          Add Contact
        </h1>

        <p className="mt-1 text-sm text-slate-500">
          Create a contact and
          optionally connect it to
          an existing lead.
        </p>
      </div>

      <ContactForm
        loading={loading}
        submitLabel="Create Contact"
        onSubmit={
          handleSubmit
        }
        onCancel={() =>
          navigate(
            ROUTES.CONTACTS
          )
        }
      />
    </div>
  );
};

export default AddContact;