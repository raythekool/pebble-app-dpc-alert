#!/usr/bin/env python

import os
import shutil

from os.path import abspath, dirname, join

TOP = abspath(dirname(__file__))

def options(ctx):
    pass


def configure(ctx):
    ctx.load('pebble_sdk')


def build(ctx):
    ctx.load('pebble_sdk')
    ctx.pbl_program(source=ctx.path.ant_glob('src/**/*.c'))
