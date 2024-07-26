package com.chicmic.notetaking

import android.os.Environment
import android.os.StatFs
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import java.io.File

class StorageModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {

    override fun getName(): String {
        return "StorageModule"
    }

    @ReactMethod
    fun getTotalDiskCapacity(promise: Promise) {
        try {
            val path: File = Environment.getDataDirectory()
            val stat = StatFs(path.path)
            val blockSize = stat.blockSizeLong
            val totalBlocks = stat.blockCountLong
            val total = totalBlocks * blockSize
            promise.resolve(total.toDouble())
        } catch (e: Exception) {
            promise.reject("Error", e)
        }
    }

    @ReactMethod
    fun getFreeDiskStorage(promise: Promise) {
        try {
            val path: File = Environment.getDataDirectory()
            val stat = StatFs(path.path)
            val blockSize = stat.blockSizeLong
            val availableBlocks = stat.availableBlocksLong
            val free = availableBlocks * blockSize
            promise.resolve(free.toDouble())
        } catch (e: Exception) {
            promise.reject("Error", e)
        }
    }
}
