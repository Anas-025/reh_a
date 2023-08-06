import React, { ReactNode, createContext, useContext, useState } from 'react';
import ErrorDialog from './ErrorDialog';
import GPBackdrop from './GPBackdrop';
import GPDialog from './GPDialog';
import GPSnackbar from './GPSnackbar';



export interface GPCType {
  showError: (message: string) => void;
  showSnackbar: (message: string) => void;
  showDialog: (title: string, message: string, secondaryText: string, primaryActionText: string, primaryActionHandler: () => void) => void;
  closeDialog: () => void;
  showBackdrop: (message: string) => void;
  closeBackdrop: () => void;
}

export const GPCContext = createContext<GPCType>({
  showError: () => {},
  showSnackbar: () => {},
  showDialog: () => {},
  closeDialog: () => {},
  showBackdrop: () => {},
  closeBackdrop: () => {},
});

interface GPCProviderProps {
  children: ReactNode;
}

const GPCProvider: React.FC<GPCProviderProps> = ({ children }) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [primaryActionText, setPrimaryActionText] = useState('');
  const [secondaryText, setSecondaryText] = useState('');
  const [primaryActionHandler, setPrimaryActionHandler] = useState<() => void>(() => {});
  const [backdropLoading, setBackdropLoading] = useState(false);
  const [backdropMessage, setBackdropMessage] = useState('');



  const showDialog = (
    dialogTitle: string,
    dialogMessage: string,
    secondaryText: string,
    dialogPrimaryActionText: string,
    dialogPrimaryActionHandler: () => void
  ) => {
    setTitle(dialogTitle);
    setMessage(dialogMessage);
    setSecondaryText(secondaryText);
    setPrimaryActionText(dialogPrimaryActionText);
    setPrimaryActionHandler(() => {
      if (dialogPrimaryActionHandler) {
        return () => {
          dialogPrimaryActionHandler();
        };
      }
      return () => {};
    });
    setOpen(true);
  };

  const handlePrimaryAction = () => {
    primaryActionHandler();
    setOpen(false);
  };

  const closeDialog = () => {
    setOpen(false);
  };

  const showError = (message: string) => {
    setErrorMessage(message);
    setOpenDialog(true);
  };

  const showSnackbar = (message: string) => {
    setSnackbarMessage(message);
    setOpenSnackbar(true);
  };

  const showBackdrop = (message: string) => {
    setBackdropMessage(message);
    setBackdropLoading(true);
  };

  const closeBackdrop = () => {
    setBackdropLoading(false);
  };

  return (
    <GPCContext.Provider value={{ showError, showSnackbar, showDialog, closeDialog, showBackdrop, closeBackdrop }}>
      {children}

      <GPBackdrop loading={backdropLoading} message={backdropMessage} />
      <GPDialog open={open} title={title} message={message} secondaryText={secondaryText} primaryActionText={primaryActionText} handlePrimaryAction={handlePrimaryAction} closeDialog={closeDialog} />
      <ErrorDialog message={errorMessage} open={openDialog} setOpen={setOpenDialog} />
      <GPSnackbar snackbarMessage={snackbarMessage} openSnackbar={openSnackbar} setOpenSnackbar={setOpenSnackbar} />
      
    </GPCContext.Provider>
  );
};

export { GPCProvider };
export const useGPC = () => useContext(GPCContext);