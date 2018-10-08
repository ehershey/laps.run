#!/usr/bin/env bash

main(){
  pushd ops-website
  aws s3 sync s3://laps.run-ops-data-private/ content/
  hugo
  aws s3 sync public s3://ops.laps.run/
  popd
}

main
