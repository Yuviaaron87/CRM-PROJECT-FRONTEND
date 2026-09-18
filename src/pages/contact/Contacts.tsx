import {
  ContactRound,
  Plus,
} from "lucide-react";

import {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  Link,
} from "react-router";

import toast from "react-hot-toast";

import ContactFilters from "../../pages/contact/ContactFilters";
import ContactTable from "../../pages/contact/ContactTable";

import ConfirmDialog from "../../components/ConformDialog";
import EmptyState from "../../components/EmptyState";
import LoadingSpinner from "../../components/LoadingSpinner";
import Pagination from "../../components/Pagination";

import { ROUTES } from "../../constants/route";

import {
  contactService,
} from "../../services/contactService";

import type {
  Contact,
} from "../../types/contactTypes";

const ITEMS_PER_PAGE = 5;

const Contacts = () => {
  const [
    contacts,
    setContacts,
  ] = useState<Contact[]>([]);

  const [
    loading,
    setLoading,
  ] = useState(true);

  const [
    search,
    setSearch,
  ] = useState("");

  const [
    company,
    setCompany,
  ] = useState("");

  const [
    relation,
    setRelation,
  ] = useState("");

  const [
    sort,
    setSort,
  ] = useState("newest");

  const [
    currentPage,
    setCurrentPage,
  ] = useState(1);

  const [
    selectedContact,
    setSelectedContact,
  ] =
    useState<Contact | null>(
      null
    );

  const [
    deleting,
    setDeleting,
  ] = useState(false);

  useEffect(() => {
    const loadContacts =
      async () => {
        try {
          setLoading(true);

          const data =
            await contactService.getAll();

          setContacts(data);
        } catch {
          toast.error(
            "Failed to load contacts"
          );
        } finally {
          setLoading(false);
        }
      };

    loadContacts();
  }, []);

  const companies =
    useMemo(() => {
      return Array.from(
        new Set(
          contacts.map(
            (contact) =>
              contact.company
          )
        )
      ).sort();
    }, [contacts]);

  const filteredContacts =
    useMemo(() => {
      let result = [
        ...contacts,
      ];

      const query =
        search
          .trim()
          .toLowerCase();

      if (query) {
        result =
          result.filter(
            (contact) => {
              const fullName =
                `${contact.firstName} ${contact.lastName}`.toLowerCase();

              return (
                fullName.includes(
                  query
                ) ||
                contact.email
                  .toLowerCase()
                  .includes(
                    query
                  ) ||
                contact.company
                  .toLowerCase()
                  .includes(
                    query
                  ) ||
                contact.phone.includes(
                  query
                )
              );
            }
          );
      }

      if (company) {
        result =
          result.filter(
            (contact) =>
              contact.company ===
              company
          );
      }

      if (
        relation === "linked"
      ) {
        result =
          result.filter(
            (contact) =>
              Boolean(
                contact.leadId
              )
          );
      }

      if (
        relation ===
        "unlinked"
      ) {
        result =
          result.filter(
            (contact) =>
              !contact.leadId
          );
      }

      switch (sort) {
        case "oldest":
          result.sort(
            (a, b) =>
              new Date(
                a.createdAt
              ).getTime() -
              new Date(
                b.createdAt
              ).getTime()
          );
          break;

        case "name-asc":
          result.sort(
            (a, b) =>
              `${a.firstName} ${a.lastName}`.localeCompare(
                `${b.firstName} ${b.lastName}`
              )
          );
          break;

        case "name-desc":
          result.sort(
            (a, b) =>
              `${b.firstName} ${b.lastName}`.localeCompare(
                `${a.firstName} ${a.lastName}`
              )
          );
          break;

        default:
          result.sort(
            (a, b) =>
              new Date(
                b.createdAt
              ).getTime() -
              new Date(
                a.createdAt
              ).getTime()
          );
      }

      return result;
    }, [
      contacts,
      search,
      company,
      relation,
      sort,
    ]);

  useEffect(() => {
    setCurrentPage(1);
  }, [
    search,
    company,
    relation,
    sort,
  ]);

  const totalPages =
    Math.max(
      1,
      Math.ceil(
        filteredContacts.length /
          ITEMS_PER_PAGE
      )
    );

  const paginatedContacts =
    filteredContacts.slice(
      (currentPage - 1) *
        ITEMS_PER_PAGE,

      currentPage *
        ITEMS_PER_PAGE
    );

  const resetFilters = () => {
    setSearch("");
    setCompany("");
    setRelation("");
    setSort("newest");
    setCurrentPage(1);
  };

  const handleDelete =
    async () => {
      if (!selectedContact) {
        return;
      }

      try {
        setDeleting(true);

        await contactService.delete(
          selectedContact.id
        );

        setContacts(
          (previous) =>
            previous.filter(
              (contact) =>
                contact.id !==
                selectedContact.id
            )
        );

        toast.success(
          "Contact deleted successfully"
        );

        setSelectedContact(
          null
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
      <LoadingSpinner text="Loading contacts..." />
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            Contacts
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Manage people and
            relationships connected
            to your CRM.
          </p>
        </div>

        <Link
          to={
            ROUTES.ADD_CONTACT
          }
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700"
        >
          <Plus size={17} />

          Add Contact
        </Link>
      </div>

      <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
          <ContactRound
            size={19}
          />
        </div>

        <div>
          <p className="text-xs text-slate-500">
            Total Contacts
          </p>

          <p className="text-lg font-bold text-slate-900">
            {contacts.length}
          </p>
        </div>
      </div>

      <ContactFilters
        search={search}
        company={company}
        relation={relation}
        sort={sort}
        companies={companies}
        onSearchChange={
          setSearch
        }
        onCompanyChange={
          setCompany
        }
        onRelationChange={
          setRelation
        }
        onSortChange={
          setSort
        }
        onReset={
          resetFilters
        }
      />

      {paginatedContacts.length >
      0 ? (
        <>
          <ContactTable
            contacts={
              paginatedContacts
            }
            onDelete={
              setSelectedContact
            }
          />

          <Pagination
            currentPage={
              currentPage
            }
            totalPages={
              totalPages
            }
            onPageChange={
              setCurrentPage
            }
          />
        </>
      ) : (
        <div className="rounded-xl border border-slate-200 bg-white">
          <EmptyState
            title="No contacts found"
            description="Try changing your search or filters, or create a new contact."
          />
        </div>
      )}

      <ConfirmDialog
        open={Boolean(
          selectedContact
        )}
        title="Delete Contact?"
        description={`Are you sure you want to delete ${
          selectedContact
            ? `${selectedContact.firstName} ${selectedContact.lastName}`
            : ""
        }? This action cannot be undone.`}
        loading={deleting}
        onCancel={() =>
          setSelectedContact(
            null
          )
        }
        onConfirm={
          handleDelete
        }
      />
    </div>
  );
};

export default Contacts;