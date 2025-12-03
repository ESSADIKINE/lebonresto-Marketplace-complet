import { useState } from 'react';

/**
 * Custom hook to manage delete confirmation modal state
 * @returns {Object} - deleteModal state and handlers
 */
export default function useDeleteConfirm() {
    const [deleteModal, setDeleteModal] = useState({
        isOpen: false,
        itemId: null,
        itemName: '',
        onConfirm: null
    });

    const openDeleteModal = (itemId, itemName, onConfirmCallback) => {
        setDeleteModal({
            isOpen: true,
            itemId,
            itemName,
            onConfirm: onConfirmCallback
        });
    };

    const closeDeleteModal = () => {
        setDeleteModal({
            isOpen: false,
            itemId: null,
            itemName: '',
            onConfirm: null
        });
    };

    const handleConfirmDelete = () => {
        if (deleteModal.onConfirm) {
            deleteModal.onConfirm(deleteModal.itemId);
        }
        closeDeleteModal();
    };

    return {
        deleteModal,
        openDeleteModal,
        closeDeleteModal,
        handleConfirmDelete
    };
}
