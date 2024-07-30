'use client'

import Input from '@/components/dashboard/Input';
import SmsInput from '@/components/dashboard/SmsInput';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { logInStepOne as RlogInStepOne, logInStepTwo as RlogInStepTwo } from '@/services/Authorization';
import toast from 'react-hot-toast';
import { Toaster } from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import Timer from '@/components/dashboard/Timer';
import { setCookie } from 'cookies-next';
import { useDispatch } from 'react-redux';
import { setPermissions } from '@/state/permissions';

const LogIn = () => {

    const dispatch = useDispatch();
    const [userName, setUserName] = useState("09137378601");
    const [code, setCode] = useState('');
    const [errorMessage, setErrorMessage] = useState(null);
    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(false);
    const [timer, setTimer] = useState(0);
    const { push } = useRouter();

    const checkForm = () => {
        const iranianPhoneNumberRegex = /^09\d{9}$/;
        let check = iranianPhoneNumberRegex.test(userName);
        let erros = [];
        if (step == 1 && !check) {
            erros.push(<div className='text-center'>فرمت شماره تماس صحیح نمی باشد</div>);
        }
        if (step == 2 && code.length != 7) {
            erros.push(<div className='text-center'>کد 4 رقم می باشد</div>);
            check = false;
        }
        setErrorMessage(erros);
        return check;
    }

    const logInStepOne = async () => {
        try {
            const checkform = checkForm();
            if (!checkform) {
                return;
            }
            setLoading(true);
            let response = await RlogInStepOne({ userName });
            let { data } = response;
            setTimer(data.expireTime);
            toast.success(data.message);
            setStep(2);
            setLoading(false);

        } catch (error) {
            console.log(error);
            setLoading(false);
            if (error?.response?.data?.message) {
                toast.error(error.response.data.message);
            } else {
                toast.error('Something is wrong!');
            }
        }
    }

    const logInStepTwo = async () => {
        try {
            const checkform = checkForm();
            if (!checkform) {
                return;
            }
            setLoading(true);
            let convertedCode = code.replace(/\s/g, '');
            let response = await RlogInStepTwo({ userName, code: convertedCode });
            let { data } = response;
            setCookie('token', data.token, { expires: new Date(new Date().getTime() + parseInt(data.sessionTime) * 60000) });
            toast.success(data.message);
            setLoading(false);
            push('/dashboard');
        } catch (error) {
            console.log(error);
            setLoading(false);
            if (error?.response?.data?.message) {
                toast.error(error.response.data.message);
            } else {
                toast.error('Something is wrong!');
            }
        }
    }


    useEffect(() => {
        setErrorMessage(null);
    }, [userName, code]);

    useEffect(() => {
        if (code.length == 7) {
            if (step == 1) {
                logInStepOne();
            } else {
                logInStepTwo();
            }
        }
    }, [code]);

    useEffect(() => {
        setErrorMessage(null);
    }, [userName, code]);

    return (
        <div className='bg-primary flex h-screen w-full max-w-full overflow-hidden justify-center items-center'>
            <Toaster position="top-center" />
            <div className='flex flex-col bg-secondary rounded-lg items-center max-w-[500px] w-full sm:w-1/2 p-2 gap-3'>
                <div className='relative max-w-full w-[160px] h-[160px]  rounded-full overflow-hidden '>
                    <Image
                        src="/logo.jpg"
                        alt="Picture of the author"
                        fill
                        style={{ objectFit: "cover" }}
                    />
                </div>
                <div className='w-full'>
                    <Input color={"bg-primary"} placeholder={"Phone Number"} cssClass={"text-center"} maxLength={11}
                        onChange={(e) => setUserName(e.target.value)}
                        value={userName}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                if (step == 1) {
                                    logInStepOne();
                                } else {
                                    logInStepTwo();
                                }
                            }
                        }}
                    />
                </div>
                {step == 2 &&
                    <div className='w-full'>
                        <SmsInput color={"bg-primary"} placeholder={"sms code"} cssClass={"text-center"} autoFocus maxLength={6}
                            setValue={setCode}
                            value={code}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    if (step == 1) {
                                        logInStepOne();
                                    } else {
                                        logInStepTwo();
                                    }
                                }
                            }}
                        />
                    </div>
                }
                {timer != 0 && step == 2 &&
                    <div className='w-full flex items-center justify-center'>
                        <Timer min={timer} TimerEndListener={() => {
                            setStep(1);
                            setCode("");
                            setTimer(0);
                        }} />
                    </div>
                }
                <div className='w-full flex bg-red-400 rounded-md items-center justify-center'>
                    <span>{errorMessage}</span>
                </div>
                <div className='flex flex-col items-center'>
                    {loading ?
                        <div className="relative  w-12 h-12">
                            <div className="w-full h-full rounded-full absolute  border-4 border-solid border-gray-200"></div>
                            <div className="w-full h-full rounded-full absolute animate-spin  border-4 border-solid border-green-500 border-t-transparent shadow-md"></div>
                        </div>
                        :
                        <button className='bg-green-500 rounded-sm p-2 w-36' onClick={() => {
                            if (step == 1) {
                                logInStepOne();
                            } else {
                                logInStepTwo();
                            }
                        }}
                        >{step == 1 ? "Enter" : (timer > 0) ? "Enter" : "ReSend code"}</button>
                    }
                </div>

            </div>
        </div>
    );
};

export default LogIn;