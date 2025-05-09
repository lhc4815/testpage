#!/bin/bash

echo "===== 포트폴리오 웹사이트 GitHub 게시 스크립트 ====="
echo

# Git이 설치되어 있는지 확인합니다.
if ! command -v git &> /dev/null
then
    echo "Git이 설치되어 있지 않습니다. 다음 링크에서 Git을 설치하세요:"
    echo "https://git-scm.com/downloads"
    echo
    read -p "계속하려면 아무 키나 누르세요..."
    exit 1
fi

# 사용자 정보 입력
read -p "GitHub 사용자명을 입력하세요: " username
read -p "GitHub 이메일을 입력하세요: " email
read -p "원하는 리포지토리 이름을 입력하세요 (기본값: portfolio): " repo

if [ -z "$repo" ]; then
    repo="portfolio"
fi

echo
echo "=== Git 초기화 및 설정 ==="
echo

# Git 초기화
git init
git config user.name "$username"
git config user.email "$email"

# 파일 추가
git add .
git commit -m "포트폴리오 웹사이트 초기 업로드"

# GitHub 원격 저장소 연결
echo
echo "=== GitHub 원격 저장소 연결 ==="
echo
echo "다음 단계:"
echo "1. GitHub에서 새 리포지토리를 만드세요: https://github.com/new"
echo "2. 리포지토리 이름을 \"$repo\"로 설정하세요"
echo "3. 공개(Public) 옵션을 선택하세요"
echo "4. 'Create repository' 버튼을 클릭하세요"
echo
read -p "GitHub에서 리포지토리를 생성한 후 계속하려면 Enter 키를 누르세요..."

echo
echo "원격 저장소를 연결합니다..."
git remote add origin https://github.com/$username/$repo.git

# 푸시
echo
echo "=== GitHub에 푸시 ==="
echo
echo "변경 사항을 GitHub에 푸시합니다..."
git push -u origin master

echo
echo "=== GitHub Pages 설정 ==="
echo
echo "다음 단계:"
echo "1. GitHub에서 다음 URL로 접속하세요: https://github.com/$username/$repo/settings/pages"
echo "2. Source 섹션에서 Branch 드롭다운을 클릭하고 'master'를 선택하세요"
echo "3. Save 버튼을 클릭하세요"
echo "4. 몇 분 후, 포트폴리오는 다음 URL에서 접근 가능합니다: https://$username.github.io/$repo/"
echo
echo "주의: GitHub Pages가 활성화되기까지 몇 분 정도 소요될 수 있습니다."
echo

echo "스크립트 실행이 완료되었습니다."
read -p "계속하려면 아무 키나 누르세요..."
