import { observer } from "mobx-react-lite";
import { AuthView, FieldType, IField } from "react-declarative";

import Logo from "../../components/common/Logo";

import { CC_MOCK_USER_EMAIL, CC_MOCK_USER_PASSWORD } from "../../config/params";

import ioc from '../../lib/ioc';

const fields: IField[] = [
    {
        type: FieldType.Text,
        fieldRightMargin: '0',
        fieldBottomMargin: '1',
        title: 'Email',
        name: 'email',
        description: 'Your email',
        placeholder: 'tripolskypetr@gmail.com',
        inputType: 'email',
        isInvalid: ({ email }) => {
            if (!email) {
                return "Email should not be empty";
            }
            return null;
        },
    },
    {
        type: FieldType.Text,
        fieldRightMargin: '0',
        fieldBottomMargin: '0',
        title: 'Password',
        name: 'password',
        description: 'Your password',
        placeholder: 'password',
        inputType: 'password',
        isInvalid: ({ password }) => {
            if (!password) {
                return "Password should not be empty";
            }
            return null;
        },
    },
    {
        type: FieldType.Checkbox,
        fieldRightMargin: '0',
        fieldBottomMargin: '0',
        title: 'Register',
        name: 'register',
    },
];

export const LoginPage = observer(() => {

    const handleAuth = async (data: { email: string, password: string, register: boolean }) => {
        let isOk = true;
        if (data.register) {
            isOk = await ioc.firebaseService.register(data);
        }
        if (!isOk) {
            return;
        }
        isOk = await ioc.firebaseService.login(data);
        if (isOk) {
            ioc.routerService.push('/todo_list');
        }
    };

    return (
        <AuthView
            handler={() => ({
                email: CC_MOCK_USER_EMAIL,
                password: CC_MOCK_USER_PASSWORD,
                register: false,
            })}
            Logo={Logo}
            fields={fields}
            onAuth={handleAuth}
        />
    );
});

export default LoginPage;
