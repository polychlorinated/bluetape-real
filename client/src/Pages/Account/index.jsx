import React, { Fragment, useEffect, useState, useRef } from 'react';
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
  ImageContainerFallBack,
} from './Styles';
import NavbarLeft from '../../shared/components/NavbarLeft';
import { SectionTitle } from '../Project/EpicDetails/Styles';
import { formatDateTimeConversational } from '../../shared/utils/dateTime';
import { connect } from 'react-redux';
import ProjectsTable from '../MyProjects/Board/ProjectsTable';
import Loading from '../../shared/components/Loaders/Mangekyo';
import { Divider } from '../../shared/components/Breadcrumbs/Styles';
const UserAccount = ({ user, orgProjects }) => {
  const [{ data }, fetchUser] = useApi.get(
    `/user/${user.id}`,
    {},
    { cachePolicy: 'no-cache' }
  );
  const [{ isUpdating }, updateUser] = useApi.put(`/user/${user.id}`);
  const [userProjects, setUserProjects] = useState([]);
  const [files, setFiles] = useState({});
  const fileRef = useRef();
  const fileRefB = useRef();
  user = data;

  useEffect(() => {
    if (user !== null) {
      setUserProjects(
        orgProjects.filter((project) => user.projects.includes(project.id))
      );
    }
  }, [user, orgProjects]);
  if (!user) return <Loading />;
  console.log(user, 'user........................');
  return (
    user && (
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
                await updateUser(values);
                if (files.file) {
                  let url = `https://testapi.bluetape.io/v1/user/postImage/${user.id}`;
                  // let url = `http://localhost:5000/v1/user/postImage/${user.id}`;
                  let fd = new FormData();
                  fd.append('file', files.file);
                  await axios.post(url, fd);
                  setFiles({});
                }
                await fetchUser();
                toast.success('Changes have been saved successfully.');
              } catch (error) {
                toast.success('Changes unsuccessful!');
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
                      onClick={(e) => {
                        fileRef.current.click();
                      }}
                    >
                      <input
                        id="file"
                        name="file"
                        ref={fileRef}
                        type="file"
                        style={{ display: 'none' }}
                        onChange={(event) => {
                          event.preventDefault();
                          setFiles({ file: event.target.files[0] });
                        }}
                      ></input>

                      {files.file ? (
                        files.file.name
                      ) : user.profile.includes('video') ? (
                        <div style={{ maxWidth: '100%', maxHeight: '100%' }}>
                          <video
                            controls
                            style={{ width: '100%', height: '100%' }}
                            src={`https://testapi.bluetape.io/files/${user.profile}`}
                          />
                        </div>
                      ) : (
                        <Image
                          src={`https://testapi.bluetape.io/files/${user.profile}`}
                        ></Image>
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
                          event.preventDefault();
                          setFiles({ file: event.target.files[0] });
                        }}
                      ></input>
                      <div className="avatar__container">
                        <Avatar
                          size={150}
                          avatarUrl={user.avatarUrl}
                          name={user.name}
                          onClick={(e) => {
                            console.log('click');
                            e.preventDefault();
                            fileRefB.current.click();
                          }}
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
    )
  );
};

const mapStateToProps = (state) => ({
  user: state.userState.user,
  orgProjects: state.projectState.orgProjects,
});

export default connect(mapStateToProps)(UserAccount);
