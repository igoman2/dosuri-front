import FullModalBase from "@/components/Modal/FullModalBase";
import { useRecoilState } from "recoil";
import { SearchMapModalState } from "./store";
import SearchMapView from "./SearchMapView";

const SearchMapModal = () => {
  const [modal, setModal] = useRecoilState(SearchMapModalState);

  const closeModal = () => {
    setModal({ isActive: false });
  };

  return (
    <>
      {modal.isActive && (
        <FullModalBase
          isActive={false}
          onClose={() => {
            closeModal();
          }}
          title=""
          isBackBtnVisible={true}
          onClickBack={closeModal}
        >
          <SearchMapView />
        </FullModalBase>
      )}
    </>
  );
};

export default SearchMapModal;
