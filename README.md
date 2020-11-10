# Clubhub  プロクラブマッチングサービス

## URL
[Clubhub](https://clubes.ml/)

## 概要
ツイッターでプロクラブ（サッカーゲーム内でオンラインでチームを作って試合をするモード）のメンバーを募集しているツイートを元に、募集を探せる/募集できるサービスです。
募集条件を絞って検索出来る機能と、募集条件を指定してツイートできる機能を作りました。

## インフラ構成図
![Clubhub構成図](https://user-images.githubusercontent.com/43578455/98728555-04c9a300-23dd-11eb-93b6-49ee900b51fe.jpg)
①clubes-front: フロントエンドのリポジトリ←このリポジトリです  
②[clubes-api-go](https://github.com/Masamichi-Iimori/clubes-api-lambda): GoとLambdaによるバックエンドのリポジトリ  
③[clubes-crawl-tweet](https://github.com/Masamichi-Iimori/clubes-crawl-tweet): GoとLambdaとCloudWatchで、５分に一回ツイッターのAPIを叩いてDBに入れる処理のリポジトリ  

## 使用技術
- Golang
- React
- TypeScript
- Twitter API
- AWS
  - lambda
  - APIGateway
  - SAM(serverless application model)
  - CloudFront
  - S3
  - CodePipeline
  - CodeBuild
