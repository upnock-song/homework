document.addEventListener("DOMContentLoaded", function () {
  const sortContainer = document.getElementById("sortContainer");
  const sortButton = document.getElementById("sortButton");
  const sortButtonText = document.getElementById("sortButtonText");
  const sortDropdown = document.getElementById("sortDropdown");
  const sortOptions = document.querySelectorAll(".sort-option");
  const achievementMenu = document.querySelector(".achievement-menu");

  // 默认排序方式
  let currentSortMethod = "name-asc";

  // 切换下拉菜单显示/隐藏
  sortButton.addEventListener("click", function (e) {
    e.stopPropagation();
    sortContainer.classList.toggle("active");
  });

  // 点击选项处理
  sortOptions.forEach((option) => {
    option.addEventListener("click", function (e) {
      e.preventDefault();

      // 更新按钮文本
      sortButtonText.textContent = this.textContent;

      // 更新选中状态
      sortOptions.forEach((opt) => opt.classList.remove("selected"));
      this.classList.add("selected");

      // 获取排序方式
      currentSortMethod = this.getAttribute("data-sort");
      console.log("选择的排序方式:", currentSortMethod);

      // 调用排序函数
      sortAchievements(currentSortMethod);

      // 关闭下拉菜单
      sortContainer.classList.remove("active");
    });
  });

  // 点击页面其他区域关闭下拉菜单
  document.addEventListener("click", function () {
    sortContainer.classList.remove("active");
  });

  // 阻止下拉菜单内部的点击事件冒泡
  sortDropdown.addEventListener("click", function (e) {
    e.stopPropagation();
  });

  // 排序函数
  function sortAchievements(sortMethod) {
    const containers = Array.from(
      document.querySelectorAll(".achievement-container")
    );

    containers.sort((a, b) => {
      switch (sortMethod) {
        case "name-asc": // 按字母排序(A-Z)
          return a
            .getAttribute("data-name")
            .localeCompare(b.getAttribute("data-name"));

        case "rarity-desc": // 按稀有度(稀有度字母顺序)
          return b
            .getAttribute("rarity")
            .localeCompare(a.getAttribute("rarity"));

        case "progress-desc": // 进度：由高至低
          return (
            parseFloat(b.getAttribute("progress")) -
            parseFloat(a.getAttribute("progress"))
          );

        case "progress-asc": // 进度：由低至高
          return (
            parseFloat(a.getAttribute("progress")) -
            parseFloat(b.getAttribute("progress"))
          );

        case "xp-desc": // 经验值：由高至低
          return (
            parseInt(b.getAttribute("experience")) -
            parseInt(a.getAttribute("experience"))
          );

        case "xp-asc": // 经验值：由低至高
          return (
            parseInt(a.getAttribute("experience")) -
            parseInt(b.getAttribute("experience"))
          );

        default:
          return 0;
      }
    });

    // 清空容器
    while (achievementMenu.firstChild) {
      achievementMenu.removeChild(achievementMenu.firstChild);
    }

    // 重新添加排序后的元素
    containers.forEach((container) => {
      achievementMenu.appendChild(container);
    });

    console.log("已按", getSortMethodName(sortMethod), "排序成就");
  }

  // 获取排序方法名称
  function getSortMethodName(method) {
    const names = {
      "name-asc": "按字母排序",
      "rarity-desc": "稀有度",
      "progress-desc": "进度：由高至低",
      "progress-asc": "进度：由低至高",
      "xp-desc": "经验值：由高至低",
      "xp-asc": "经验值：由低至高",
    };
    return names[method] || method;
  }

  // 初始化时按默认方式排序
  sortAchievements(currentSortMethod);
});
