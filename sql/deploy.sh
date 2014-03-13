#!/bin/bash
read -p "This will delete all carpool data. Are you sure? (Yy)" -n 1 -r
echo    # (optional) move to a new line
if [[ $REPLY =~ ^[Yy]$ ]]
then
  echo "Deploying database..."
  cd "${BASH_SOURCE%/*}" || exit                             # cd into the bundle and use relative paths
  mysql --host=localhost --user=root --password=admin < initialize.sql
  echo "done."
fi


read -p "Populate DB with sample data? (y/n)" -n 1 -r
echo    # (optional) move to a new line
if [[ $REPLY =~ ^[Yy]$ ]]
then
  echo "Populating..."
  mysql --host=localhost --user=root --password=admin < insert_sample_data.sql
  echo "done."
fi

