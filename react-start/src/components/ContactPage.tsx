import React, { useEffect, useState } from "react";
import { useParams, useRoute } from "wouter";
import ContactDetail from "./ContactDetail";
import EditComponent from "./EditComponent";
import { ContactInfo } from "../app";

interface ContactPageProps {
  onAddFunc: any;
  setActiveContactIdFunc: any;
  deleteContact: any;

}

const ContactPage: React.FC<ContactPageProps> = ({
  onAddFunc,
  setActiveContactIdFunc,
  deleteContact

}) => {
  const [contactDetail, setContactDetail] = useState<ContactInfo | undefined>();
  const params = useParams<{ id: string }>();
  const [isEditing] = useRoute(`/${params.id}/edit`);

  useEffect(() => {
    fetchContactInfo();
  }, [params.id]);

  async function fetchContactInfo() {
    const response = await fetch(`http://localhost:7070/contact/${params.id}`, {
      method: "GET",
    });
    const data = await response.json();
    setContactDetail(data);
    setActiveContactIdFunc(data.id);
  }

  function onAdd() {
    onAddFunc();
    useEffect(() => {
      fetchContactInfo();
    });
  }

  if (!contactDetail) return <div>Načítání...</div>;

  return isEditing ? (
    <EditComponent
      onAddFunc={onAdd}
      contact={contactDetail}
      taskHandler={onAdd}
    />
  ) : (
    <ContactDetail
      deleteContact={deleteContact}
      contact={contactDetail}
    />
  );
};

export default ContactPage;
