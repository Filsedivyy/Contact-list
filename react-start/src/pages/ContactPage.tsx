import React, { useEffect, useState } from "react";
import { Redirect, useParams, useRoute } from "wouter";
import ContactDetail from "../components/ContactDetail";
import EditComponent from "../components/EditComponent";
import { ContactInfo } from "../app";
import LoadingComponent from "../components/Loading";
import ErrorPage from "./ErrorPage";

interface ContactPageProps {
  onAddFunc: any;
  setActiveContactIdFunc: any;
  deleteContact: any;
}

const ContactPage: React.FC<ContactPageProps> = ({
  onAddFunc,
  setActiveContactIdFunc,
  deleteContact,
}) => {
  const [contactDetail, setContactDetail] = useState<ContactInfo | null>(null);
  const params = useParams<{ id: string }>();
  const [isEditing] = useRoute(`/${params.id}/edit`);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [status, setStatus] = useState<number | null>(null);

  useEffect(() => {
    fetchContactInfo();
  }, [params.id]);

  async function fetchContactInfo() {
    setLoading(true);
    setError(false);

    try {
      const response = await fetch(
        `http://localhost:7070/contact/${params.id}`,
        {
          method: "GET",
        }
      );

      if (response.ok) {
        const data = await response.json();
        setContactDetail(data);
        setActiveContactIdFunc(data.id);
      } else {
        setStatus(response.status);
        setError(true);
      }
    } finally {
      setLoading(false);
    }
  }

  function onAdd() {
    onAddFunc();
    fetchContactInfo();
  }

  if (loading) return <LoadingComponent />;
  if (error) return <Redirect href="/error" />;
  return isEditing ? (
    <EditComponent contact={contactDetail} taskHandler={onAdd} />
  ) : (
    <ContactDetail deleteContact={deleteContact} contact={contactDetail} />
  );
};

export default ContactPage;
