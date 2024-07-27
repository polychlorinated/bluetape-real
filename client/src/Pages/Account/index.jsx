import React, { Fragment, useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import toast from '../../shared/utils/toast';
import useApi from '../../shared/hooks/api';
import { Avatar, Form } from '../../shared/components';
import axios from 'axios';
import {
  FormCont,
  FormHeading,
  FormElement,
  ActionButton,
  Header,
  AccountPage,
  AvatarContainer,
  ActionContainer,
  ImageContainer,
  Image,
} from './Styles';
import NavbarLeft from '../../shared/components/NavbarLeft';
import { SectionTitle } from '../Project/EpicDetails/Styles';
import { formatDateTimeConversational } from '../../shared/utils/dateTime';
import ProjectsTable from '../MyProjects/Board/ProjectsTable';
import Loading from '../../shared/components/Loaders/Mangekyo';
import { setUser } from '../../redux/user/user-reducer';

const UserAccount = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const orgProjects = useSelector((state) => state.project.orgProjects);

  const [{ data }, fetchUser] = useApi.get(
    `/user/${user?.id}`,
    {},
    { cachePolicy: 'no-cache' }
  );
  const [{ isUpdating }, updateUser] = useApi.put(`/user/${user?.id}`);
  const [userProjects, setUserProjects] = useState([]);
  const [files, setFiles] = useState({});
  const fileRef = useRef();
  const fileRefB = useRef();

  useEffect(() => {
    if (user?.id) {
      fetchUser();
    }
  }, [user, fetchUser]);

  useEffect(() => {
    if (user && orgProjects) {
      setUserProjects(
        orgProjects.filter((project) => user.projects.includes(project.id))
      );
    }
  }, [user, orgProjects]);

  if (!user) return <Loading />;

  return (
    <AccountPage>
      <Fragment>
        <NavbarLeft page="account" />

        <Form
          initialValues={Form.initialValues(user, (get) => ({
            name: get('name'),
          }))}
          validations={{
            name: [Form.is.required(), Form.is.maxLength(100)],
          }}
          onSubmit={async (values, form) => {
            try {
              const updatedUser = await updateUser(values);
              if (files.file) {
                let url = `${process.env.REACT_APP_API_URL}.com/v1/user/postImage/${user.id}`;
                let fd = new FormData();
                fd.append('file', files.file);
                await axios.post(url, fd);
                setFiles({});
              }
              await fetchUser();
              dispatch(setUser(updatedUser));
              toast.success('Changes have been saved successfully.');
            } catch (error) {
              toast.error('Changes unsuccessful!');
            }
          }}
        >
          <FormCont>
            <FormElement>
              <Header>
                <FormHeading>Account</FormHeading>
              </Header>
              <AvatarContainer>
                {user.profile || files.file ? (
                  <ImageContainer
                    onClick={() => fileRef.current.click()}
                  >
                    <input
                      id="file"
                      name="file"
                      ref={fileRef}
                      type="file"
                      style={{ display: 'none' }}
                      onChange={(event) => {
                        setFiles({ file: event.target.files[0] });
                      }}
                    />
                    {files.file ? (
                      files.file.name
                    ) : user.profile.includes('video') ? (
                      <div style={{ maxWidth: '100%', maxHeight: '100%' }}>
                        <video
                          controls
                          style={{ width: '100%', height: '100%' }}
                          src={`${process.env.REACT_APP_API_URL}.com/files/${user.profile}`}
                        />
                      </div>
                    ) : (
                      <Image
                      src={`${process.env.REACT_APP_API_URL}.com/files/${user.profile}`}
                      />
                    )}
                  </ImageContainer>
                ) : (
                  <React.Fragment>
                    <input
                      id="file"
                      name="file"
                      type="file"
                      ref={fileRefB}
                      style={{ display: 'none' }}
                      onChange={(event) => {
                        setFiles({ file: event.target.files[0] });
                      }}
                    />
                    <div className="avatar__container">
                      <Avatar
                        size={150}
                        avatarUrl={user.avatarUrl}
                        name={user.name}
                        onClick={() => fileRefB.current.click()}
                      />
                    </div>
                  </React.Fragment>
                )}
              </AvatarContainer>
              <Form.Field.Input name="name" label="Name" />
              <Fragment>
                <SectionTitle>Email</SectionTitle>
                <div>{user.email}</div>
              </Fragment>
              <Fragment>
                <SectionTitle>Avatar Letters</SectionTitle>
                <div>{user.name.slice(0, 2).toUpperCase()}</div>
              </Fragment>
              <Fragment>
                <SectionTitle>Member Since</SectionTitle>
                <div>{formatDateTimeConversational(user.creationDate)}</div>
              </Fragment>
              <Fragment>
                <SectionTitle>Active Projects</SectionTitle>
                <ProjectsTable projects={userProjects} page="account" />
              </Fragment>
              <ActionContainer>
                <ActionButton
                  type="submit"
                  variant="primary"
                  isWorking={isUpdating}
                >
                  Save changes
                </ActionButton>
              </ActionContainer>
            </FormElement>
          </FormCont>
        </Form>
      </Fragment>
    </AccountPage>
  );
};

export default UserAccount;