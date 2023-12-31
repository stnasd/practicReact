import { useLazyLoginQuery } from "../../../apiFirebase/apiFireBase.Slice";
import { useLazyGetInfoUserQuery } from "../../../apiFirebase/apiFireBase.Slice";
import Form from "../../Form/Form";
import { motion } from "framer-motion";
import "./LoginPage.scss";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
    const navigate = useNavigate();
    const [triggerLoginUser] = useLazyLoginQuery();
    const [triggerGetinfo] = useLazyGetInfoUserQuery();

    const onHandleSubmit = (args) => {
        triggerLoginUser(args).then((res) => {
            if (res.data === "ok") {
                navigate("/");
            }
        });
        triggerGetinfo(args.email);
    };

    return (
        <motion.div
            className="login"
            initial={{ opacity: 0, transition: { duration: 0.1 } }}
            animate={{ opacity: 1, transition: { duration: 0.3 } }}
            exit={{ opacity: 0, transition: { duration: 0.1 } }}
        >
            <Form title="Войти" onHandleSubmit={onHandleSubmit} />
        </motion.div>
    );
};

export default LoginPage;
