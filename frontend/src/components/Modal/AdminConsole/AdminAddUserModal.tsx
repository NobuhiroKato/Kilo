import * as React from 'react';
import { AdminFormInput, Modal, AdminConfirmUserModal } from 'components';
import { AuthContext } from 'Auth';

interface Props {
  open: boolean;
  closeFunc: Function;
};

const AdminAddUserModal: React.FC<Props> = (props) => {
  const { open, closeFunc } = props;
  const { roles } = React.useContext(AuthContext);
  const [name, setName] = React.useState("");
  const [user, setUser] = React.useState<any>();
  const [openConfirm, setOpenConfirm] = React.useState(false);

  const content =
    <AdminFormInput
      labelText="名前"
      inputType="text"
      onChangeFunc={setName}
      value={name}
    />;

  const handleSubmit = () => {
    const user = {
      first_name: name,
      last_name: "aaa",
      first_name_kana: "カケコ",
      last_name_kana: "ナナナ",
      email: "aaa@aaa.com",
      password: "password",
      birthday: "19970216",
      phone_number: "00000000",
    };
    setUser(user);
    setOpenConfirm(true);
  };

  return (
    <div>
      { roles && (
        <Modal
          open={open}
          headerTitle="ユーザー新規作成"
          submitText="確認"
          submitFunc={async () => {await handleSubmit()}}
          content={content}
          closeFunc={closeFunc}
        />
      )}
      { user && (
        <AdminConfirmUserModal
          open={openConfirm}
          user={user}
          closeFunc={() => setOpenConfirm(false)}
          type="add"
        />
      )}
    </div>
  );
};

export default AdminAddUserModal;