import React, { useEffect, useState } from "react";
import { useParams, useRoute } from "wouter";
import ContactDetail from "./ContactDetail";
import EditComponent from "./EditComponent";
import { ContactInfo } from "../app";

interface ContactPageProps {
  onAddFunc: any;
  setActiveContactIdFunc: any;
 // cancelFunc: any;
}

const ContactPage: React.FC<ContactPageProps> = ({
  onAddFunc,
  setActiveContactIdFunc,
  //cancelFunc,
}) => {
  const [contactDetail, setContactDetail] = useState<ContactInfo | undefined>();
  const params = useParams<{ id: string }>();
  const [isEditing, setIsEditing] = useState(false);
  // const [isEditing] = useRoute(`/${contactDetail.id}/edit`);
  //nevypisuje se ID, nefunguje směrování rovnou z /edit

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

  function EditToggler() {
    isEditing ? setIsEditing(false) : setIsEditing(true);
  }
  function onAdd() {
    onAddFunc();
    useEffect(() => {
      fetchContactInfo();
    });
  }
  console.log(isEditing);
  if (!contactDetail) return <div>Načítání...</div>;

  return isEditing ? (
    <EditComponent
      onAddFunc={onAdd}
      contact={contactDetail}
      taskHandler={EditToggler}
    />
  ) : (
    <ContactDetail
     // deleteFunc={cancelFunc}
      onAddFunc={onAdd}
      contact={contactDetail}
      taskHandler={EditToggler}
    />
  );
};

export default ContactPage;
