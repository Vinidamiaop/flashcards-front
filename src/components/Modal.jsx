"use client"

import {useState, useRef, useEffect} from 'react';

export default function Modal({ className, children, onClose }) {
    // Define a referência para o contêiner do modal
    const modalRef = useRef(null);

    // Função para verificar se o clique foi fora do modal e fechar o modal
    const handleClickOutside = (event) => {
        if (modalRef.current && !modalRef.current.contains(event.target)) {
            onClose();
        }
    };

    useEffect(() => {
        // Adiciona o ouvinte de evento de clique quando o componente é montado
        document.addEventListener('mousedown', handleClickOutside);

        // Remove o ouvinte de evento de clique quando o componente é desmontado
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className="absolute w-full h-full flex flex-col justify-center items-center z-20 backdrop-blur-sm p-2">
            <div ref={modalRef} className={`flex flex-col -mt-12 justify-center items-center bg-gray-200 text-gray-900 dark:text-gray-100 dark:bg-gray-800 max-w-[32rem] shadow drop-shadow-lg p-4 rounded animate-slideBottom ${className}`}>
                {children}
            </div>
        </div>
    );
}
