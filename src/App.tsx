/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useCallback, useState } from "react";
import SiteSelect, { Site } from "./components/Select";
import { MultiValue, SingleValue } from "react-select";
import { useDropzone } from "react-dropzone";
import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd";
import { useSnackbar } from "notistack";
import SiteLink from "./components/SiteLink";
import Nav from "./components/Nav";
const defautSite = {
  id: 1,
  label: "Github",
  value: "Github",
  icon: "ti ti-brand-github",
  color: "#333",
};
type DevLink = {
  id: number;
  site: Site | null;
  link: string;
};

function App() {
  const [activeTab, setActiveTab] = useState("links");
  const [selectedSite] = useState<Site>(defautSite);
  const [preview, setPreview] = useState(false);
  const [links, setLinks] = useState<DevLink[]>(
    JSON.parse(localStorage.getItem("links") || "[]")
  );
  const [firstName, setFirstName] = useState(
    localStorage.getItem("firstName") || ""
  );
  const [lastName, setLastName] = useState(
    localStorage.getItem("lastName") || ""
  );
  const [email, setEmail] = useState(localStorage.getItem("email") || "");

  const { enqueueSnackbar } = useSnackbar();
  const handleSiteChange = (
    selected: SingleValue<Site> | MultiValue<Site>,
    id: number
  ) => {
    const updatedLinks = links.map((link) =>
      link.id === id ? { ...link, site: selected as Site } : link
    );
    setLinks(updatedLinks);
  };

  const handleLinkChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    id: number
  ) => {
    const updatedLinks = links.map((link) =>
      link.id === id ? { ...link, link: e.target.value } : link
    );
    setLinks(updatedLinks);
  };

  const addNewSite = () => {
    const newLink = {
      id: links.length + 1,
      site: selectedSite,
      link: "",
    };
    setLinks((prev) => [...prev, newLink]);
  };

  const deleteLink = (id: number) => {
    const rest = links.filter((link) => link.id !== id);
    setLinks(rest);
  };
  const [myFiles, setMyFiles] = useState<any>([]);

  const onDrop = useCallback((acceptedFiles: any) => {
    setMyFiles([...acceptedFiles]);
  }, []);
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
  });

  const onDragEnd = (result: any) => {
    const { destination, source } = result;

    if (!destination) return;
    if (destination.index === source.index) return;

    const updatedLinks = Array.from(links);
    const [movedItem] = updatedLinks.splice(source.index, 1);
    updatedLinks.splice(destination.index, 0, movedItem);

    setLinks(updatedLinks);
  };
  const isValidEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };
  const handleSaveUserInfo = () => {
    if (!firstName || !lastName) {
      enqueueSnackbar("Please fill all the fields", {
        variant: "error",
      });
      return;
    }
    if (!isValidEmail(email)) {
      enqueueSnackbar("Please enter a valid email", {
        variant: "error",
      });
      return;
    }
    localStorage.setItem("firstName", firstName);
    localStorage.setItem("lastName", lastName);
    localStorage.setItem("email", email);
    enqueueSnackbar("User info saved successfully", {
      variant: "success",
    });
  };
  const isValidLink = (link: string) => {
    return /^(https?:\/\/)?(www\.)?[a-zA-Z0-9@:%._+~#?&//=]{2,256}\.[a-z]{2,4}\b([-a-zA-Z0-9@:%_+~#?&//=]*)$/.test(
      link
    );
  };
  const saveLinks = () => {
    const hasInvalidLink = links.some(
      (link) => link.link.trim() === "" || !isValidLink(link.link)
    );
    if (hasInvalidLink) {
      enqueueSnackbar("Please enter a valid link", {
        variant: "error",
      });
      return;
    }
    const uniqueSites = links
      .map((link) => link.site?.value)
      .filter((value, index, self) => self.indexOf(value) === index);
    if (uniqueSites.length !== links.length) {
      enqueueSnackbar("Cannot save links with duplicate sites", {
        variant: "error",
      });
      return;
    }
    localStorage.setItem("links", JSON.stringify(links));
    enqueueSnackbar("Links saved successfully", {
      variant: "success",
    });
  };

  return (
    <div className="bg-primary/5">
      {preview ? (
        <div className="relative pt-6 after:absolute after:bg-primary after:top-0 after:left-0 after:right-0 after:w-full after:h-[250px] after:rounded-b-3xl">
          <nav className="container relative z-[3] flex justify-between items-center p-2 xl:p-4 rounded-xl  bg-white">
            <button
              onClick={() => setPreview(false)}
              className="px-6 py-3 rounded-lg border border-primary text-primary font-semibold">
              Back to Editor
            </button>
            <button className="px-6 py-3 rounded-lg border bg-primary text-white font-semibold">
              Share
            </button>
          </nav>
          <div className="container pt-20 pb-10 flex justify-center">
            <div className="bg-white relative z-[3] rounded-xl shadow-xl px-6 py-5 xl:px-8 xl:py-8 w-[300px]">
              <div className="pb-2 flex justify-center">
                <div className="rounded-full border-2 border-primary size-36">
                  {myFiles.length > 0 && (
                    <img
                      className="rounded-full w-full size-36 object-cover object-center"
                      src={URL.createObjectURL(myFiles[0])}
                      alt=""
                    />
                  )}
                </div>
              </div>
              <h4 className="text-center text-heading capitalize">
                {firstName} {lastName}
              </h4>
              <p className="text-center text-sm mb-12 text-body">{email}</p>
              <div className="custom-scrollbar">
                <div className="space-y-4 max-h-[300px] overflow-y-auto">
                  {links.map(({ id, link, site }) => (
                    <SiteLink key={id} link={link} site={site as Site} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <Nav
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            preview={preview}
            setPreview={setPreview}
          />

          <div className="container">
            <div className="pt-6 grid grid-cols-12 gap-6">
              <div className="col-span-12 lg:col-span-5 max-lg:hidden">
                <div className="bg-white px-20 py-16">
                  <div className="relative">
                    <img src="/phone.png" className="w-full" alt="" />
                    <div className="absolute inset-0 px-7 xl:px-9 xxl:px-11">
                      <div className="pt-12 xl:pt-16 xxl:pt-20 pb-2 xxl:pb-4 flex justify-center">
                        <div className="rounded-full size-[72px] xl:size-[92px] xxl:size-[112px]">
                          {myFiles.length > 0 && (
                            <img
                              className="rounded-full border-2 border-primary h-full w-full xl:size-[92px] xxl:size-[112px] object-cover object-center"
                              src={URL.createObjectURL(myFiles[0])}
                              alt=""
                            />
                          )}
                        </div>
                      </div>
                      <h5 className="text-center h-6 xl:h-9 xl:text-3xl text-heading capitalize">
                        {firstName} {lastName}
                      </h5>
                      <p className="text-center h-5 text-sm mb-6 xl:mb-12 xxl:mb-16 text-body">
                        {email}
                      </p>
                      <div className="custom-scrollbar">
                        <div className="space-y-3 xl:space-y-4 xxl:space-y-5  max-h-[300px] xxl:max-h-[400px] overflow-y-auto">
                          {links.map(({ id, link, site }) => (
                            <SiteLink
                              key={id}
                              link={link}
                              site={site as Site}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-span-12 lg:col-span-7 bg-white p-4 xl:p-6 xxl:p-8">
                {activeTab == "links" ? (
                  <div>
                    <h3 className="text-heading mb-4">Customize Your Links</h3>
                    <p className="text-body mb-8">
                      Add/edit/remove links below and then share all your
                      profiles with the world!
                    </p>
                    <button
                      onClick={addNewSite}
                      className="flex justify-center rounded-lg font-semibold w-full py-3 px-5 border border-primary text-primary items-center gap-3">
                      <i className="ti ti-plus"></i> Add New Link
                    </button>
                    <DragDropContext onDragEnd={onDragEnd}>
                      <Droppable droppableId="links">
                        {(provided) => (
                          <div
                            className="space-y-4 mt-6"
                            ref={provided.innerRef}
                            {...provided.droppableProps}>
                            {links.length != 0
                              ? links.map((link, index) => (
                                  <Draggable
                                    key={link.id}
                                    draggableId={link.id.toString()}
                                    index={index}>
                                    {(provided) => (
                                      <div
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        className="p-3 xl:p-5 bg-primary/5 rounded-lg">
                                        <div className="flex justify-between items-center mb-3">
                                          <div
                                            {...provided.dragHandleProps}
                                            className="flex items-center gap-3">
                                            <i className="ti ti-drag-drop"></i>
                                            <p className="text-heading font-medium">
                                              Link # {link.id}
                                            </p>
                                          </div>
                                          <button
                                            onClick={() => deleteLink(link.id)}
                                            className="text-body text-base font-medium">
                                            Remove
                                          </button>
                                        </div>
                                        <p className="mb-2 text-sm">Platform</p>
                                        <SiteSelect
                                          defaultValue={link.site}
                                          onChange={(selected) =>
                                            handleSiteChange(selected, link.id)
                                          }
                                        />
                                        <p className="text-body text-sm mb-2 mt-4">
                                          Link
                                        </p>
                                        <div className="relative">
                                          <input
                                            type="text"
                                            value={link.link}
                                            onChange={(e) =>
                                              handleLinkChange(e, link.id)
                                            }
                                            placeholder="https://github.com/johndoe"
                                            className="w-full focus:outline-none pl-10 rounded-lg border border-neutral-300 py-2.5 hover:border-primary focus:border-primary px-4"
                                          />
                                          <i className="ti ti-link absolute top-1/2 -translate-y-1/2 left-5 text-body"></i>
                                        </div>
                                      </div>
                                    )}
                                  </Draggable>
                                ))
                              : ""}
                            {provided.placeholder}
                          </div>
                        )}
                      </Droppable>
                    </DragDropContext>

                    {links.length && (
                      <div className="border-t border-neutral-300 flex justify-end mt-6">
                        <button
                          onClick={saveLinks}
                          className="mt-8 px-8 py-3 rounded-xl bg-primary font-semibold text-neutral-50">
                          Save
                        </button>
                      </div>
                    )}
                  </div>
                ) : (
                  <div>
                    <h3 className="text-heading mb-4">Customize Your Links</h3>
                    <p className="text-body mb-8">
                      Add your details to create a personal touch to your
                      profile!
                    </p>
                    <div className="space-y-4 xl:space-y-6">
                      <div className="bg-primary/5 p-4 rounded-xl flex flex-col md:flex-row gap-3 md:items-center">
                        <div className="md:w-1/3">
                          <p className="text-body font-medium">
                            Profile Picture{" "}
                          </p>
                        </div>
                        <div className="md:w-2/3 flex items-center gap-4">
                          <div>
                            <div className="flex gap-4 items-center">
                              <form
                                {...getRootProps()}
                                action="#"
                                id="avatar-upload">
                                <div className="size-36 rounded-lg flex items-center justify-center cursor-pointer clickable-avatar bg-neutral-20 border-4 border-neutral-0">
                                  <input {...getInputProps()} />
                                  {myFiles.length > 0 ? (
                                    <div className="relative">
                                      <img
                                        className="w-full h-full object-cover object-center rounded-lg"
                                        src={URL.createObjectURL(myFiles[0])}
                                        alt=""
                                      />
                                      <div className="absolute inset-0 bg-black/60 rounded-lg opacity-0 hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center">
                                        <i className="ti ti-photo text-white"></i>
                                        <p className="text-white text-center">
                                          Change Photo
                                        </p>
                                      </div>
                                    </div>
                                  ) : (
                                    <div className="flex flex-col items-center justify-center avatar-img">
                                      <i className="las la-camera text-3xl text-neutral-100"></i>
                                      <p>Upload Photo</p>
                                    </div>
                                  )}
                                </div>
                              </form>

                              <p className="text-body text-sm">
                                Image must be below 1024*1024px. Use PNG, JPG or
                                BMP format.
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="bg-primary/5 p-4 rounded-xl space-y-4 xxl:space-y-6">
                        <div className="flex flex-col md:flex-row gap-3 md:items-center">
                          <div className="md:w-1/3">
                            <p className="text-body font-medium">First Name*</p>
                          </div>
                          <div className="md:w-2/3">
                            <input
                              type="text"
                              value={firstName}
                              onChange={(e) => setFirstName(e.target.value)}
                              placeholder="Abdur"
                              className="text-input"
                            />
                          </div>
                        </div>
                        <div className=" flex flex-col md:flex-row gap-3 md:items-center">
                          <div className="md:w-1/3">
                            <p className="text-body font-medium">Last Name*</p>
                          </div>
                          <div className="md:w-2/3">
                            <input
                              type="text"
                              value={lastName}
                              onChange={(e) => setLastName(e.target.value)}
                              placeholder="Rahman"
                              className="text-input"
                            />
                          </div>
                        </div>
                        <div className=" flex flex-col md:flex-row gap-3 md:items-center">
                          <div className="md:w-1/3">
                            <p className="text-body font-medium">Email*</p>
                          </div>
                          <div className="md:w-2/3">
                            <input
                              type="email"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              placeholder="abdurrahman@example.com"
                              className="text-input"
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="border-t border-neutral-300 flex justify-end mt-6">
                      <button
                        onClick={handleSaveUserInfo}
                        className="mt-8 px-8 py-3 rounded-xl bg-primary font-semibold text-neutral-50">
                        Save
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
