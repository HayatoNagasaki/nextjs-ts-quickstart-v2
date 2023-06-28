import Image from 'next/image';
import React, { useEffect } from 'react';

type Props = {
  open: boolean;
  title: string;
  content: string | JSX.Element;
  actionEl: string | JSX.Element;
};

const DaialogModal: React.FC<Props> = ({
  open,
  title,
  content,
  actionEl,
  ...rest
}) => {
  const handleOpen = () => {
    try {
      (window as any).my_modal_1.showModal();
    } catch (err) {}
  };
  const handleClose = () => {
    (window as any).my_modal_1.close();
  };

  useEffect(() => {
    if (open) {
      handleOpen();
    } else {
      handleClose();
    }
  }, [open]);

  return (
    <dialog id="my_modal_1" className="modal">
      <form method="dialog" className="modal-box">
        <h3 className="font-bold text-lg">{title}</h3>
        <p className="py-2">{content}</p>
        <div className="modal-action mt-2">{actionEl}</div>
      </form>
    </dialog>
  );
};

export default DaialogModal;
