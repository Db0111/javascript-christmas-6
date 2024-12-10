class Badge {
  static badges = ['별', '트리', '산타'];

  static calculateBadge(discountTotalPrice) {
    if (discountTotalPrice >= 5000 && discountTotalPrice < 10000) {
      return this.badges[0]; // 별
    } else if (discountTotalPrice >= 10000 && discountTotalPrice < 20000) {
      return this.badges[1]; // 트리
    } else if (discountTotalPrice >= 20000) {
      return this.badges[2]; // 산타
    } else {
      return '없음'; // 기본값
    }
  }
}
export default Badge;
