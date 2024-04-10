import React from 'react';

const Modal: React.FC<{ onClose: () => void, children: React.ReactNode }> = ({ onClose, children }) => {
    return (
        <div className="fixed inset-0 z-50 flex items-center bg-slate-600/80 justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none">
            <div className="relative w-full max-w-lg mx-auto my-6">
                <div className="relative bg-white rounded-lg shadow-lg outline-none focus:outline-none">

                    <div className="flex items-center justify-between p-5 border-b border-gray-200 rounded-t">
                        <h3 className="text-xl font-bold text-gray-800">Character Details</h3>
                        <button
                            className="p-1 ml-auto border-0 focus:outline-none"
                            onClick={onClose}
                        >
                            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>

                    </div>

                    <div className="p-6">{children}</div>
                </div>
            </div>
        </div>
    );
};

export default Modal;
