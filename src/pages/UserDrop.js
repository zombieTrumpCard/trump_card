import React, { useState } from 'react';

export default function UserDrop() {
  const [showModal, setShowModal] = useState(false); // 모달
  // 모달 열기
  const handleOpenModal = () => {
    setShowModal(true);
  };

  // 모달 닫기
  const handleCloseModal = () => {
    setShowModal(false);
  };
  return (
    <div className="userdrop">
      <p className="title">회원 탈퇴</p>
      <p>이용 약관</p>
      <textarea className="textarea">
        제4장 계약 해지 제11조 (계약 해지) 회원이 서비스 이용 계약을 해지 하고자
        할 때는 개인정보수정의 &apos;회원탈퇴&apos; 메뉴에서 회원탈퇴를
        신청하시면 됩니다. 탈퇴를 신청하시면 즉시 탈퇴처리가 완료되며, 탈퇴후
        7일 동안은 회사에 다시 가입하실 수 없습니다. 제12조 (탈퇴 회원의
        개인정보 이용) 1.회사는 회원정보를 회원이 탈퇴하는 시점으로부터 1년까지
        보유할 수 있습니다. 2.회사가 보관하고 있는 탈퇴 회원의 정보는 회원의
        가입이력관리와 지적재산권 관리,개인정보보호를 위해서만 활용할 수
        있습니다. 3.단, 관계법령의 규정에 의하여 보존할 필요가 있는 경우 회사는
        아래와 같이 관계법령에서 정한 일정한 기간 동안 회원정보를 보관합니다.
        -표시/광고에 관한 기록 : 6개월 -계약 또는 청약철회 등에 관한 기록 : 5년
        -대금결제 및 재화 등의 공급에 관한 기록 : 5년 제13조 (자격상실) 다음 각
        항의 사유에 해당하는 경우 회사는 사전 통보 없이, 이용계약을 해지하거나
        기간을 정하여 서비스 이용을 중지 또는 이용계약 해지 후 무기한 가입제한
        할 수 있습니다.
      </textarea>
      <br />
      <input type="checkbox" />
      <span>본문 내용에 동의합니다.</span>
      <button type="button" onClick={handleOpenModal}>탈퇴하기</button>
      {/* The Modal */}
      {showModal && (
      <div id="myModal" className="modal">
        {/* Modal content */}
        <div className="modal-content">
          <button
            className="close"
            onClick={handleCloseModal}
            type="button"
          >
            &times;
          </button>
          <p>정말 탈퇴하시겠습니까?</p>
          <button type="button">네</button>
          <button type="button">아니요</button>
        </div>
      </div>
      )}
    </div>
  );
}
