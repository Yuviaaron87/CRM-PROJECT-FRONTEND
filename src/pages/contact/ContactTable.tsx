import {
  Eye,
  Link2,
  Pencil,
  Trash2,
} from "lucide-react";

import {
  useNavigate,
} from "react-router";

import type {
  Contact,
} from "../../types/contactTypes";

interface ContactTableProps {
  contacts: Contact[];

  onDelete: (
    contact: Contact
  ) => void;
}

const ContactTable = ({
  contacts,
  onDelete,
}: ContactTableProps) => {
  const navigate = useNavigate();

  return (
    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[950px]">
          <thead className="bg-slate-50">
            <tr className="border-b border-slate-200">
              <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                Contact
              </th>

              <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                Company
              </th>

              <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                Phone
              </th>

              <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                Location
              </th>

              <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                Lead
              </th>

              <th className="px-5 py-3 text-right text-xs font-semibold uppercase tracking-wide text-slate-500">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {contacts.map(
              (contact) => (
                <tr
                  key={contact.id}
                  className="border-b border-slate-100 transition last:border-0 hover:bg-slate-50"
                >
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-blue-100 text-sm font-semibold text-blue-700">
                        {contact.firstName
                          .charAt(0)
                          .toUpperCase()}
                        {contact.lastName
                          .charAt(0)
                          .toUpperCase()}
                      </div>

                      <div>
                        <p className="text-sm font-semibold text-slate-800">
                          {
                            contact.firstName
                          }{" "}
                          {
                            contact.lastName
                          }
                        </p>

                        <p className="mt-1 text-xs text-slate-500">
                          {
                            contact.email
                          }
                        </p>
                      </div>
                    </div>
                  </td>

                  <td className="px-5 py-4">
                    <p className="text-sm text-slate-700">
                      {
                        contact.company
                      }
                    </p>

                    <p className="mt-1 text-xs text-slate-400">
                      {
                        contact.jobTitle
                      }
                    </p>
                  </td>

                  <td className="px-5 py-4 text-sm text-slate-600">
                    {
                      contact.phone
                    }
                  </td>

                  <td className="px-5 py-4 text-sm text-slate-600">
                    {
                      contact.city
                    }
                  </td>

                  <td className="px-5 py-4">
                    {contact.leadId ? (
                      <span className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-2.5 py-1 text-xs font-medium text-blue-700">
                        <Link2
                          size={12}
                        />

                        {
                          contact.leadId
                        }
                      </span>
                    ) : (
                      <span className="text-xs text-slate-400">
                        Not linked
                      </span>
                    )}
                  </td>

                  <td className="px-5 py-4">
                    <div className="flex justify-end gap-1">
                      <button
                        type="button"
                        title="View Contact"
                        onClick={() =>
                          navigate(
                            `/contacts/${contact.id}`
                          )
                        }
                        className="rounded-lg p-2 text-slate-500 hover:bg-blue-50 hover:text-blue-600"
                      >
                        <Eye
                          size={17}
                        />
                      </button>

                      <button
                        type="button"
                        title="Edit Contact"
                        onClick={() =>
                          navigate(
                            `/contacts/${contact.id}/edit`
                          )
                        }
                        className="rounded-lg p-2 text-slate-500 hover:bg-amber-50 hover:text-amber-600"
                      >
                        <Pencil
                          size={17}
                        />
                      </button>

                      <button
                        type="button"
                        title="Delete Contact"
                        onClick={() =>
                          onDelete(
                            contact
                          )
                        }
                        className="rounded-lg p-2 text-slate-500 hover:bg-red-50 hover:text-red-600"
                      >
                        <Trash2
                          size={17}
                        />
                      </button>
                    </div>
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ContactTable;